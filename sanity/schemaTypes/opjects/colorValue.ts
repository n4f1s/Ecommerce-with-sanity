// /sanity/schemas/objects/colorValue.ts (optional reusable color object)
import { defineField, defineType } from 'sanity'

export const colorValue = defineType({
  name: 'colorValue',
  title: 'Color Value',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hex',
      title: 'Hex code',
      type: 'string',
      description: 'e.g. #FF0000',
      validation: (Rule) =>
        Rule.custom((val) =>
          !val || /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)
            ? true
            : 'Invalid hex code'
        ),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'hex' } },
})
