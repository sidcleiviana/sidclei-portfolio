import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Free-form prose. The only block that carries Portable Text authored inline.
 */
export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Texto",
  type: "object",
  fields: [
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
              { title: "Código", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { body: "body" },
    prepare({ body }) {
      const first = Array.isArray(body)
        ? body.find((b: { _type?: string }) => b._type === "block")
        : undefined;
      const text =
        first &&
        Array.isArray((first as { children?: { text?: string }[] }).children)
          ? (first as { children: { text?: string }[] }).children
              .map((c) => c.text ?? "")
              .join("")
          : "";
      return { title: "Texto", subtitle: text.slice(0, 60) };
    },
  },
});
