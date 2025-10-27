import { NextResponse } from 'next/server'
import { backendClient } from '@/sanity/lib/backend-client'
import { createOrderSchema, type CreateOrderInput } from '@/lib/schemas/order'
import z, { ZodError } from 'zod'
import { getRateLimiter, getClientIp } from '@/lib/rate-limit'

function generateOrderNumber () {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')

  // Use Web Crypto for secure randomness
  const bytes = new Uint8Array(4)
  globalThis.crypto.getRandomValues(bytes)
  const rand = Array.from(bytes)
    .map(b => b.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, 6)
    .toUpperCase()

  return `S-${y}${m}${d}-${rand}`
}

export async function POST (req: Request) {
  try {
    // ========== RATE LIMITING CHECK ==========
    const ip = getClientIp(req)

    // Log IP for debugging (remove in production if needed)
    // console.log(`📍 Order request from IP: ${ip}`)

    const ratelimit = getRateLimiter()
    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    if (!success) {
      const resetDate = new Date(reset)
      const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
      const minutesUntilReset = Math.ceil(retryAfterSeconds / 60)

      console.warn(
        `⚠️ Rate limit exceeded for IP: ${ip}. Reset in ${minutesUntilReset} minutes.`
      )

      return NextResponse.json(
        {
          error: 'Too many order requests',
          message: `You have reached the maximum number of orders (${limit} per hour). Please try again in ${minutesUntilReset} minutes.`,
          retryAfter: retryAfterSeconds,
          limit,
          remaining: 0,
          reset: resetDate.toISOString()
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': retryAfterSeconds.toString()
          }
        }
      )
    }

    // console.log(
    //   `✅ Rate limit check passed for IP: ${ip}. Remaining: ${remaining}/${limit}`
    // );

    // ========== VALIDATE REQUEST ==========
    const json = await req.json()

    // Validate + coerce
    const data: CreateOrderInput = createOrderSchema.parse(json)

    // Normalize strings
    const normalize = (s?: string) => (s ? s.trim() : '')
    const orderNumber = generateOrderNumber()

    // ========== CREATE ORDER ==========
    const orderDoc = {
      _type: 'order',
      orderNumber,
      customerName: normalize(data.customerName),
      phoneNumber: normalize(data.phoneNumber),
      address: normalize(data.address),
      division: normalize(data.division),
      district: normalize(data.district),
      upazila: normalize(data.upazila),
      city: normalize(data.city),
      postalCode: normalize(data.postalCode),
      deliveryInstruction: normalize(data.deliveryInstruction),
      deliveryCharge: data.deliveryCharge,
      totalPrice: data.totalPrice, // already coerced number
      paymentMethod: 'Cash on Delivery',
      status: 'pending',
      orderDate: new Date().toISOString(),
      products: data.items.map(item => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        product: {
          _type: 'reference',
          _ref: item.product._id
        },
        quantity: item.quantity
      }))
    }

    const result = await backendClient.create(orderDoc)

    console.log(`✅ Order created successfully: ${orderNumber}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        orderId: result._id,
        orderNumber
      },
      {
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    )
  } catch (err: unknown) {
    // Zod validation error
    if (err instanceof ZodError) {
      const tree = z.treeifyError(err)
      console.error('❌ Validation error:', tree)
      return NextResponse.json(
        { error: 'Invalid request', details: tree },
        { status: 400 }
      )
    }

    // Rate limiter setup error
    if (err instanceof Error && err.message.includes('Upstash Redis')) {
      console.error('❌ Rate limiter configuration error:', err.message)
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    // General error
    console.error('❌ Error creating order:', err)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
