import { ShoppingCart } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: ShoppingCart,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      description: 'Unique order ID for internal tracking',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Optional, used for confirmation emails'
    }),
    defineField({
      name: 'address',
      title: 'Street Address or P.O. Box',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'division',
      title: 'Division',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'upazila',
      title: 'Upazila',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
    }),
    defineField({
      name: 'deliveryInstruction',
      title: 'Delivery Instruction',
      type: 'text',
      description: 'Optional note for delivery personnel'
    }),
    defineField({
      name: 'products',
      title: 'Products Ordered',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              product: 'product.name',
              quantity: 'quantity',
              image: 'product.image',
              price: 'product.price'
            },
            prepare (select) {
              return {
                title: `${select.quantity} × ${select.product}`,
                subtitle: `৳ ${(select.price || 0) * (select.quantity || 0)}`,
                media: select.image
              }
            }
          }
        })
      ]
    }),
    defineField({
      name: 'deliveryCharge',
      title: 'Delivery Charge',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price (৳)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      initialValue: 'Cash on Delivery',
      readOnly: true
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      name: 'customerName',
      amount: 'totalPrice',
      status: 'status',
      phone: 'phoneNumber'
    },
    prepare (select) {
      return {
        title: `${select.name} (${select.status})`,
        subtitle: `৳${select.amount} - 📞 ${select.phone}`,
        media: ShoppingCart
      }
    }
  }
})
