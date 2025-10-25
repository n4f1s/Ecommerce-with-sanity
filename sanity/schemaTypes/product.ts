import { ShoppingCart } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: ShoppingCart,
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Product Thumpnail Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'productImages',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      options: {
        layout: 'grid'
      },
      description:
        'Upload multiple images (can add one by one or multiple at once)'
    }),
    defineField({
      name: 'description',
      title: 'Descrription',
      type: 'blockContent'
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'blockContent'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: Rule => Rule.min(0)
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price'
    },
    prepare (selection) {
      const title = selection.title || 'No name'
      const price = selection.price !== undefined ? `$${selection.price}` : ''
      return {
        title,
        subtitle: price,
        media: selection.media
      }
    }
  }
})
