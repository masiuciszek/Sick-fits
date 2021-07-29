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
import {buttonResetStyles, pxToRem} from "@styles/css-helpers"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {formatDate} from "@utils/helpers"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticPaths, GetStaticProps} from "next"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment, useEffect, useState} from "react"
type PostItem = Omit<PostItemType, "slug">
import DownArrow from "@components/icons/down-arrow"
import UpArrow from "@components/icons/up-arrow"
import {css} from "@emotion/react"
import {motion} from "framer-motion"
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

        <ScrollToButton icon="up-arrow" />
      </PostWrapper>
    </Fragment>
  )
}
export default PostPage

type IconType = "up-arrow" | "down-arrow"
interface ScrollToButtonProps {
  icon: IconType
}
const iconHandler = (type: IconType) => {
  switch (type) {
    case "up-arrow":
      return <UpArrow />
    case "down-arrow":
      return <DownArrow />

    default:
      throw new Error(`${type} icon does not exist`)
  }
}
const ScrollToButton = ({icon}: ScrollToButtonProps) => {
  const [showScroll, setShowScroll] = useState(false)

  const scrollToHandler = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 700) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showScroll])

  return (
    <motion.button
      initial={{opacity: 0}}
      animate={{opacity: showScroll ? 1 : 0}}
      exit={{opacity: 0}}
      disabled={!showScroll}
      transition={{opacity: {duration: 0.2}}}
      whileHover={{
        backgroundColor: colors.colorGray300,
        boxShadow: elevations.shadowLg,
        color: colors.colorHighlight,
      }}
      css={css`
        ${buttonResetStyles};
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        border: 2px solid ${colors.colorTextPrimary};
        padding: 0.5rem;
        border-radius: ${borderRadius.borderRadiusM};
        box-shadow: ${elevations.shadowMd};
        background-color: ${colors.colorBgBackground};
        &:disabled {
          opacity: 0.5;
        }
      `}
      onClick={() => scrollToHandler()}
    >
      {iconHandler(icon)}
    </motion.button>
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
