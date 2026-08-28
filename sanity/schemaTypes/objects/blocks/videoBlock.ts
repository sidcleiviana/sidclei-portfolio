import { defineField, defineType } from "sanity";

/**
 * Video is referenced by URL (YouTube / Vimeo / direct file). Heavy files are
 * never uploaded to the CMS and never autoplay (CLAUDE.md §30).
 */
export const videoBlock = defineType({
  name: "videoBlock",
  title: "Vídeo",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL do vídeo",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "poster",
      title: "Thumbnail / poster",
      type: "imageWithAlt",
    }),
    defineField({
      name: "caption",
      title: "Legenda",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url", media: "poster" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Vídeo", subtitle, media };
    },
  },
});
