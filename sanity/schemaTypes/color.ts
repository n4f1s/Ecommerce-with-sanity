import { defineField, defineType } from "sanity";

export const color = defineType({
  name: "color",
  title: "Color",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Color name",
      type: "string",
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
      name: "hex",
      title: "Hex value",
      type: "string",
      description: "Optional visual hex like #FF0000",
      validation: (Rule) =>
        Rule.custom((val) =>
          !val || /^#([0-9A-Fa-f]{3}){1,2}$/.test(val) ? true : "Invalid hex"
        ),
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
