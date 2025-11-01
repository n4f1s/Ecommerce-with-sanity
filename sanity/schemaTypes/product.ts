import { ShoppingCart } from 'lucide-react'
import { defineField, defineType, SanityDocument } from 'sanity'

// Helper types (minimal shapes used by validation/hidden callbacks)
type OptionValue = { label: string; hex?: string }
type ProductOption = { name: string; values?: OptionValue[] }

type VariantOption = { name: string; value: string; hex?: string }
type ProductVariant = { options?: VariantOption[] }

// Narrower view of the product doc used in callbacks
type ProductDoc = { options?: ProductOption[] }

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
      name: 'file',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload a short product video (MP4/WebM recommended).'
    }),
    defineField({
      name: 'poster',
      title: 'Video poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown before playback and as the gallery thumbnail.'
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
      name: 'previousPrice',
      title: 'Previous price',
      type: 'number',
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

    // defineField({
    //   name: 'colors',
    //   title: 'Available Colors',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'color' }] }],
    //   description: 'Leave empty if this product has no color variants'
    // }),
    // defineField({
    //   name: 'sizes',
    //   title: 'Available Sizes',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'size' }] }],
    //   description: 'Leave empty if this product has no size variants'
    // }),

    // OPTIONS (optional)
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'productOption' }],
      description:
        'Add option sets like Color, Size, Weight; leave empty if not applicable',
      // Typed array validation (no unions) to satisfy Rule.custom constraints
      validation: Rule =>
        Rule.custom<ProductOption[]>(opts => {
          if (!Array.isArray(opts)) return true
          const names = opts.map(o => o.name?.toLowerCase() ?? '')
          const hasDup = names.some((n, i) => n && names.indexOf(n) !== i)
          return hasDup
            ? 'Option names must be unique (e.g., only one "Color")'
            : true
        })
    }),

    // VARIANTS (optional; shown only when options exist)
    // defineField({
    //   name: 'variants',
    //   title: 'Variants',
    //   type: 'array',
    //   of: [{ type: 'productVariant' }],
    //   description: 'Add variants only if product has option combinations; leave empty otherwise',
    //   // Accept SanityDocument in hidden context and assert to ProductDoc
    //   hidden: ({ document }: { document?: SanityDocument }) => {
    //     const doc = document as ProductDoc | undefined
    //     return !((doc?.options?.length ?? 0) > 0)
    //   },
    //   // Typed array validation with standard context; assert document to ProductDoc
    //   validation: (Rule) =>
    //     Rule.custom<ProductVariant[]>((vars, ctx: { document?: SanityDocument }) => {
    //       if (!Array.isArray(vars)) return true
    //       const doc = ctx.document as ProductDoc | undefined

    //       // Build allowed values from product.options
    //       const optionMap = new Map<string, Set<string>>() // name -> set(values)
    //       for (const o of doc?.options ?? []) {
    //         const key = o.name?.toLowerCase() ?? ''
    //         const vals = new Set((o.values ?? []).map((v) => v.label.toLowerCase()))
    //         optionMap.set(key, vals)
    //       }

    //       // Check each variant's selections
    //       for (const v of vars) {
    //         for (const sel of v.options ?? []) {
    //           const n = sel.name?.toLowerCase() ?? ''
    //           const val = sel.value?.toLowerCase() ?? ''
    //           if (!optionMap.has(n)) {
    //             return `Variant references unknown option "${sel.name}"`
    //           }
    //           if (!optionMap.get(n)!.has(val)) {
    //             return `Variant value "${sel.value}" not found in "${sel.name}"`
    //           }
    //         }
    //       }
    //       return true
    //     }),
    // }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage featured section',
      initialValue: false,
      options: { layout: 'checkbox' }
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
