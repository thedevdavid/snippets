import { remarkInstall } from "fumadocs-docgen";
import { remarkAutoTypeTable, createGenerator } from "fumadocs-typescript";
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod/v3";

const generator = createGenerator();

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

const blogSchema = z.lazy(() =>
  frontmatterSchema.extend({
    author: z.string(),
    date: z.coerce.date(),
  })
);

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: blogSchema,
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkInstall, [remarkAutoTypeTable, { generator }]],
  },
});
