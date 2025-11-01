// /sanity/schemas/objects/optionValue.ts
import { defineField, defineType } from 'sanity'

export const optionValue = defineType({
  name: 'optionValue',
  title: 'Option Value',
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
      title: 'Hex (only for Color)',
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
  preview: {
    select: { title: 'label', subtitle: 'hex' },
  },
})
