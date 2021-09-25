import PostLayout from "@components/blog/post-layout"
import PostNavigation from "@components/blog/post-navigation"
import {PostItemType} from "@components/blog/types"
import Brackets from "@components/icons/brackets"
import Hash from "@components/icons/hash"
import CodeBlock from "@components/mdx/code-block"
import Counter from "@components/mdx/examples/counter"
import Seo from "@components/seo/seo"
import {colors, sizes} from "@styles/styled-record"
import {formatDate} from "@utils/helpers"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticProps} from "next"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import React, {FC, Fragment} from "react"
type PostItem = Omit<PostItemType, "slug">
import {EditPostLink, List, PostWrapper} from "@components/blog/styles"
import Title from "@components/common/title"
import {css} from "@emotion/react"
import {above} from "@styles/media-query"
import Image, {ImageProps} from "next/image"

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

  const {title, spoiler, updated, tags, date} = postData?.scope as Record<
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
        <Title
          incomingStyles={css`
            span {
              color: ${colors.colorTextPrimary};
            }
            h1 {
              font-size: ${sizes.h3};
              @media ${above.tablet} {
                font-size: ${sizes.h2};
              }
            }
          `}
        >
          <h1>
            <small>
              Created <span>{formatDate(date as string)}</span>{" "}
            </small>
            <br />
            {title} <span>updated</span>{" "}
            <span>{formatDate(updated as string)}</span>
          </h1>
        </Title>

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
        <PostLayout>
          <MDXRemote {...postData} components={components} lazy />
        </PostLayout>
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

export const getStaticPaths = async () => {
  const posts = getAllPosts({fields: ["slug"]})
  const paths = posts.map(({slug}) => ({params: {slug}}))
  return {
    paths,
    fallback: true,
  }
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
  ]) as {[key: string]: string}
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

const components = {
  code: CodeBlock,
  Counter,
  Image: (props: ImageProps) => {
    return <Image alt={props.alt || "Image"} {...props} />
  },

  // img: (props: any) => <Image {...props} layout="responsive" loading="lazy" />,
}
