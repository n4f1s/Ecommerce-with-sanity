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
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Upload an image for this option value (e.g., color swatch or size reference)'
    }),
    defineField({
      name: 'hex',
      title: 'Hex (only for Color)',
      type: 'string',
      description: 'e.g. #FF0000',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'hex' }
  }
})
