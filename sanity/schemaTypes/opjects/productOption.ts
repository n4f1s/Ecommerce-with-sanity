// /sanity/schemas/objects/productOption.ts
import { defineField, defineType } from 'sanity'

export const productOption = defineType({
  name: 'productOption',
  title: 'Product Option',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Option name',
      type: 'string',
      description: 'e.g. Color, Size, Weight',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{ type: 'optionValue' }],
      description:
        'Use label for all values; set hex only for color entries',
      validation: (Rule) =>
        Rule.custom((vals, ctx) => {
          const optName = (ctx.parent as { name?: string } | undefined)?.name?.toLowerCase()
          if (!Array.isArray(vals)) return true
          if (optName === 'color') {
            const bad = vals.find((v: any) => !v?.label || !v?.hex)
            return bad ? 'Color values must include label and hex' : true
          }
          return true
        }),
    }),
  ],
  preview: {
    select: { name: 'name', values: 'values' },
    prepare(selection) {
      const { name, values } = selection as {
        name?: string
        values?: Array<{ label?: string; hex?: string }>
      }
      return {
        title: name || 'Option',
        subtitle: Array.isArray(values)
          ? values.map(v => v?.label).filter(Boolean).join(', ')
          : '',
      }
    },
  },
})
