import PostItem from "@components/blog/post-item"
import {PostItemType} from "@components/blog/types"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {colors, fonts} from "@styles/styled-record"
import {NextPage} from "next"
import {GetStaticProps} from "next"
import {Fragment} from "react"

import {getAllPosts} from "../../lib/api"

interface Props {
  posts: PostItemType[]
}

const PostsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const topics = [
  "React",
  "Css",
  "Rust",
  "JavaScript",
  "Programing paradigms",
  "Software engineering",
  "and more...",
]

const BlogPage: NextPage<Props> = ({posts}) => {
  return (
    <Fragment>
      <Seo title="All posts" />
      <Title
        incomingStyles={css`
          text-align: center;
          margin: 1rem auto;
        `}
      >
        <h1>All posts</h1>
        <p>
          Here you can find different topics when it comes to software
          development, both technical and mental subjects, blog post like
        </p>
        <ul
          css={css`
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            li {
              margin-left: ${pxToRem(10)};
              border-bottom: 1px solid ${colors.colorTextPrimary};
              font-family: ${fonts.operaorMono};
            }
          `}
        >
          {topics.map((topic) => (
            <li key={topic}>{topic} </li>
          ))}
        </ul>
      </Title>
      <PostsList>
        {posts.map((post) => (
          <PostItem key={post.title} {...post} />
        ))}
      </PostsList>
    </Fragment>
  )
}

export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts({
    fields: ["title", "spoiler", "updated", "tags", "slug"],
  })

  return {
    props: {
      posts,
    },
  }
}
