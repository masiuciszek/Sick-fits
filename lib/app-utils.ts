import {PostItemType} from "@components/blog/types"

export const getFilteredPost = (
  posts: PostItemType[],
  selectedTags: Array<string>,
) => {
  const result: PostItemType[] = []
  for (const post of posts) {
    for (const tag of selectedTags) {
      if (post.tags.includes(tag)) {
        result.push(post)
      }
    }
  }

  const map = new Map()
  const finalResult: PostItemType[] = []
  for (const post of result) {
    if (!map.has(post.id)) {
      map.set(post.id, true)
      finalResult.push(post)
    }
  }
  return finalResult
}
