import PostLayout from "@components/blog/post-layout"
import PostNavigation from "@components/blog/post-navigation"
import {tagsStyles} from "@components/blog/styles"
import {PostItemType} from "@components/blog/types"
import Brackets from "@components/icons/brackets"
import Hash from "@components/icons/hash"
import CodeBlock from "@components/mdx/code-block"
import Counter from "@components/mdx/examples/counter"
import Seo from "@components/seo/seo"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {colors} from "@styles/styled-record"
import {formatDate} from "@utils/helpers"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticPaths, GetStaticProps} from "next"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment} from "react"
type PostItem = Omit<PostItemType, "slug">
import Image from "next/image"
// import {useInView} from "react-intersection-observer"
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
  // const {ref, inView, entry} = useInView({
  //   threshold: 0,
  // })
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
  top: 1rem;
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

// IntersectionObserverEntry
const components = {
  // CodeBlock: dynamic(() => import("../../components/mdx/code-block")),
  code: CodeBlock,
  Counter,
  img: (props: any) => {
    return <Image alt={props.alt || "Image"} {...props} />
  },
  Image: (props: any) => {
    return <Image alt={props.alt || "Image"} {...props} />
  },

  // img: (props: any) => <Image {...props} layout="responsive" loading="lazy" />,
}
