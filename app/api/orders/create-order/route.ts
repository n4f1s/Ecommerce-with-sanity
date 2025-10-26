// app/api/create-order/route.ts
import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backend-client";
import { createOrderSchema, type CreateOrderInput } from "@/lib/schemas/order";
import z, { ZodError } from "zod";

function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");

  // Use Web Crypto for secure randomness
  const bytes = new Uint8Array(4);
  globalThis.crypto.getRandomValues(bytes);
  const rand = Array.from(bytes)
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 6)
    .toUpperCase();

  return `S-${y}${m}${d}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Validate + coerce
    const data: CreateOrderInput = createOrderSchema.parse(json);

    // Normalize strings
    const normalize = (s?: string) => (s ? s.trim() : "");
    const orderNumber = generateOrderNumber();

    const orderDoc = {
      _type: "order",
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
      totalPrice: data.totalPrice, // already coerced number
      paymentMethod: "Cash on Delivery",
      status: "pending",
      orderDate: new Date().toISOString(),
      products: data.items.map((item) => ({
        _type: "object",
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
    };

    const result = await backendClient.create(orderDoc);

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: result._id,
      orderNumber,
    });
  } catch (err: unknown) {
    // Zod error
    if (err instanceof ZodError) {
      const tree = z.treeifyError(err);
      return NextResponse.json(
        { error: "Invalid request", details: tree },
        { status: 400 }
      );
    }

    console.error("❌ Error creating order:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
