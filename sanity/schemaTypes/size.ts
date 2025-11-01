import { defineField, defineType } from "sanity";

export const size = defineType({
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Size label",
      type: "string",
      description: 'e.g. "S", "M", "L", "EU 42", "One Size"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
