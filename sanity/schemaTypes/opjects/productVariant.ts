// /sanity/schemas/objects/productVariant.ts
import { defineField, defineType } from 'sanity'

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional label, e.g. "Red / M"',
    }),
    defineField({
      name: 'options',
      title: 'Selected options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variantOption',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Option name',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hex',
              type: 'string',
              title: 'Hex',
              description: 'Required when Option name is "Color"',
              hidden: (ctx: { parent?: { name?: string } }) =>
                (ctx.parent?.name ?? '').toLowerCase() !== 'color',
              validation: (Rule) =>
                Rule.custom<string>((val, context) => {
                  const parent = context.parent as { name?: string } | undefined
                  const isColor = (parent?.name ?? '').toLowerCase() === 'color'
                  const hexRe = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
                  if (isColor) {
                    if (!val) return 'Hex is required for Color'
                    return hexRe.test(val) ? true : 'Invalid hex code'
                  }
                  if (val) return hexRe.test(val) ? true : 'Invalid hex code'
                  return true
                }),
            }),
          ],
          preview: {
            select: { name: 'name', value: 'value', hex: 'hex' },
            prepare({
              name,
              value,
              hex,
            }: {
              name?: string
              value?: string
              hex?: string
            }) {
              const isColor = (name ?? '').toLowerCase() === 'color'
              return {
                title: isColor && hex ? `Color: ${value} (${hex})` : `${name}: ${value}`,
              }
            },
          },
        },
      ],
      description:
        'Pairs like { name: "Color", value: "Red", hex: "#FF0000" } and { name: "Size", value: "M" }',
    }),
    // defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Overrides product price when present',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'Overrides product stock when present',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'image',
      title: 'Variant Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', options: 'options', media: 'image' },
    prepare(selection) {
      const { title, options, media } = selection as {
        title?: string
        options?: Array<{ name?: string; value?: string; hex?: string }>
        media?: unknown
      }
      const auto =
        Array.isArray(options) && options.length
          ? options
              .map((o) =>
                (o?.name ?? '').toLowerCase() === 'color' && o?.hex
                  ? `${o?.value} (${o?.hex})`
                  : `${o?.name}:${o?.value}`
              )
              .join(' / ')
          : 'Variant'
      return { title: title || auto, media: media as any }
    },
  },
})
