import {serialize} from "next-mdx-remote/serialize"
// import imageMetadata from "plugins/image-metadata"
// import imageSize from "rehype-image-size"

interface Serialization {
  post: {
    [key: string]: string
  }
  content: string
  options?: Record<
    string,
    string | Array<string> | Record<string, string | Array<string>>
  >
}

export const serializeMdx = async ({post, content, options}: Serialization) =>
  await serialize(content, {
    mdxOptions: {
      ...options,
      // rehypePlugins: [imageMetadata],
    },

    scope: post,
  })
// const mdxSource = await serialize(content, {
//   // Optionally pass remark/rehype plugins
//   mdxOptions: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//   },
//   scope: post,
// })
