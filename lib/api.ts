import fs from "fs"
import matter from "gray-matter"
import {join} from "path"
interface Item {
  [key: string]: string
}

const getDirectory = (directory: string) => join(process.cwd(), directory)
const postsDirectory = getDirectory("posts")
export const getPostSlugs = () => fs.readdirSync(postsDirectory)

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const fixedSlug = slug.replace(/\.mdx$/, "")

  const fullPath = join(postsDirectory, `${fixedSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const {data: frontMatter, content} = matter(fileContents)

  const postItem: Item = {}

  for (const field of fields) {
    if (field === "slug") {
      postItem[field] = fixedSlug
    }
    // if we need the blog content then we can pass it via the field list
    if (field === "content") {
      postItem[field] = content
    }

    if (frontMatter[field]) {
      postItem[field] = frontMatter[field]
    }
  }

  return postItem
}

interface GetPosts {
  fields: string[]
  limit?: number // TODO: When there are more posts
  sort?: "ASC" | "DESC"
}

export const getAllPosts = ({fields, sort = "DESC"}: GetPosts) => {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug, fields))

  return sort === "DESC"
    ? posts.sort((p1, p2) => (p1.updated > p2.updated ? -1 : 1))
    : posts.sort((p1, p2) => (p1.updated > p2.updated ? 1 : -1))
}
