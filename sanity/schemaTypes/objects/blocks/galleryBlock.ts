import { defineField, defineType } from "sanity";

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Galeria",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Título da seção",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Imagens",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { heading: "heading", images: "images", media: "images.0" },
    prepare({ heading, images, media }) {
      const count = Array.isArray(images) ? images.length : 0;
      return {
        title: heading || "Galeria",
        subtitle: `${count} ${count === 1 ? "imagem" : "imagens"}`,
        media,
      };
    },
  },
});
