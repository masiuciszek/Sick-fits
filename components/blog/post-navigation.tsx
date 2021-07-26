import {css} from "@emotion/react"
import {length} from "@utils/helpers"
import Link from "next/link"

import {PostNavigation as PostNavigationStyles} from "./styles"

interface Props {
  currentPostIndex: number
  previousPosSlug: string
  nextPostSlug: string
  postSlugs: string[]
}
const PostNavigation = ({
  currentPostIndex,
  previousPosSlug,
  nextPostSlug,
  postSlugs,
}: Props) => {
  return (
    <PostNavigationStyles>
      {currentPostIndex > 0 ? (
        <Link href={`/blog/${previousPosSlug}`}>
          <a>{previousPosSlug}</a>
        </Link>
      ) : (
        <p>previous post</p>
      )}

      {currentPostIndex < length(postSlugs) - 1 ? (
        <Link href={`/blog/${nextPostSlug}`} css={css``}>
          <a> {nextPostSlug} </a>
        </Link>
      ) : (
        <p>no more posts</p>
      )}
    </PostNavigationStyles>
  )
}

export default PostNavigation
