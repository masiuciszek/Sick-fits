import {
  PostNavigation as PostNavigationStyles,
  tagsStyles,
} from "@components/blog/styles"
import {PostItemType} from "@components/blog/types"
import Seo from "@components/common/seo"
import Brackets from "@components/icons/brackets"
import Hash from "@components/icons/hash"
import CodeBlock from "@components/mdx/code-block"
import Counter from "@components/mdx/examples/counter"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {colors, fonts, sizes} from "@styles/styled-record"
import {formatDate, length} from "@utils/helpers"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticPaths, GetStaticProps} from "next"
// import dynamic from "next/dynamic"
import Link from "next/link"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment} from "react"

type PostItem = Omit<PostItemType, "slug">
interface FrontMatter extends PostItem {
  date: string
  keywords: string[]
}
type FrontMatterValues = FrontMatter[keyof PostItem]

const getPostIndex = (postSlugs: string[], slug: string) => {
  const currentPostIndex = postSlugs.findIndex((p) => p === slug)
  const previousPosSlug = postSlugs[currentPostIndex - 1]
  const nextPostSlug = postSlugs[currentPostIndex + 1]
  return {currentPostIndex, previousPosSlug, nextPostSlug}
}

interface Props {
  postData: MDXRemoteSerializeResult
  postSlugs: string[]
}

const PostPage: FC<Props> = ({postData, postSlugs}) => {
  const router = useRouter()
  if (router.isFallback) {
    // TODO: Fix
    return <div>...loading</div>
  }
  const {currentPostIndex, previousPosSlug, nextPostSlug} = getPostIndex(
    postSlugs,
    router.query.slug as string,
  )

  const {title, spoiler, updated, tags} = postData?.scope as Record<
    string,
    FrontMatterValues
  >

  return (
    <Fragment>
      <Seo
        title={`Blog post ${title}`}
        description={`About blog post ${title}. ${spoiler}`}
      />
      <PostWrapper>
        <h1>
          {title} <span>{formatDate(updated as string)}</span>
        </h1>

        <List>
          {(tags as Array<string>).map((tag) => (
            <li key={tag}>
              <Hash /> {tag}
            </li>
          ))}{" "}
        </List>

        <EditPostLink href="https://github.com/masiucd/blog/pulls">
          <Brackets /> edit post
        </EditPostLink>
        <MDXRemote {...postData} components={components} lazy />
        <PostNavigation
          currentPostIndex={currentPostIndex}
          previousPosSlug={previousPosSlug}
          nextPostSlug={nextPostSlug}
          postSlugs={postSlugs}
        />
      </PostWrapper>
    </Fragment>
  )
}
export default PostPage

interface PostNavigationProps {
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
}: PostNavigationProps) => {
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

interface Result {
  postData: MDXRemoteSerializeResult
}
interface Params extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps<Result, Params> = async ({
  params,
}) => {
  const slug = params?.slug ?? "http"
  const post = getPostBySlug(slug, [
    "content",
    "title",
    "updated",
    "date",
    "created",
    "tags",
    "spoiler",
  ])
  const allPosts = getAllPosts({
    fields: ["slug", "updated"],
    sort: "DESC",
  })

  const mdxSource = await serializeMdx({
    post,
    content: post.content,
  })

  return {
    props: {
      postData: mdxSource,
      postSlugs: allPosts.map(({slug}) => slug),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts({fields: ["slug"]})

  return {
    paths: posts.map(({slug}) => ({params: {slug}})),
    fallback: true,
  }
}

const PostWrapper = styled.article`
  padding: 0.25rem;
  max-width: 950px;
  margin: ${pxToRem(40)} auto ${pxToRem(10)};
  position: relative;
  h1 {
    font-size: ${sizes.h3};
    span {
      border-bottom: 1px solid ${colors.colorHighlight};
      font-family: ${fonts.operaorMonoHco};
    }
  }
`

const List = styled.ul`
  display: flex;
  margin-bottom: 0.75rem;
  li {
    ${tagsStyles};
  }
`

const EditPostLink = styled.a`
  position: absolute;
  top: 5rem;
  right: 2rem;
  display: flex;
  align-items: center;
  font-size: ${pxToRem(10)};
  padding: ${pxToRem(4)};
  svg {
    margin-right: ${pxToRem(5)};
  }
  &:after {
    position: absolute;
    content: "";
    background-color: ${colors.colorTextPrimary};
    width: 40%;
    height: 2px;
    bottom: 0;
    left: ${pxToRem(7)};
    transition: 200ms ease-in-out width;
  }
  &:hover {
    opacity: 0.6;
    &:after {
      width: 80%;
    }
  }
`

const components = {
  // CodeBlock: dynamic(() => import("../../components/mdx/code-block")),
  // CodeBlock,
  code: CodeBlock,
  Counter,
}
