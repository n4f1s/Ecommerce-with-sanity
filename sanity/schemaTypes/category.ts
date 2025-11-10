import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "icon",
      title: "Icon (small)",
      type: "image",
      options: { hotspot: true },
      description: "Upload a small square image (e.g., 64x64) for category chips.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "icon",
      subtitle: "description",
    },
  },
})
