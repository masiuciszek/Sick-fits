import PostItem from "@components/blog/post-item"
import {PostItemType} from "@components/blog/types"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {flexColumn, flexRow, pxToRem} from "@styles/css-helpers"
import {borderRadius, colors, fonts} from "@styles/styled-record"
import {NextPage} from "next"
import {GetStaticProps} from "next"
import {Fragment, useState} from "react"

import {getAllPosts} from "../../lib/api"

interface Props {
  posts: PostItemType[]
  uniqueTags: Array<string>
}

const PostsList = styled.ul`
  border: 1px solid red;
  ${flexColumn()};
`

const Tags = styled.ul`
  ${flexRow({justifyContent: "space-evenly"})}
  border: 1px solid red;
  width: 40rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const TagButton = styled.li`
  background-color: ${colors.colorTextPrimary};
  min-width: 3em;
  text-align: center;
  border-radius: ${borderRadius.borderRadiusS};
  padding: 0.2rem;
  a {
    font-size: 0.85rem;
  }
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

const getFilteredPost = (
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

const renderPosts = (posts: PostItemType[], filteredPosts: PostItemType[]) => {
  if (filteredPosts.length > 0) {
    return filteredPosts.map((post) => <PostItem key={post.title} {...post} />)
  }
  return posts.map((post) => <PostItem key={post.title} {...post} />)
}

const BlogPage: NextPage<Props> = ({posts, uniqueTags}) => {
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])

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
      <Tags>
        {uniqueTags.map((tag) => (
          <TagButton key={tag}>
            {/* <button
              onClick={() => {
                setSelectedTags((prevTags) => [...prevTags, tag])
              }}
            >
              {tag}
            </button> */}
            {tag}
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTags((prevTags) => [...prevTags, tag])
                } else {
                  setSelectedTags((prevTags) =>
                    prevTags.filter((t) => t !== tag),
                  )
                }
              }}
            />
          </TagButton>
        ))}
      </Tags>
      <PostsList>
        {/* {posts.map((post) => (
          <PostItem key={post.title} {...post} />
        ))} */}
        {renderPosts(posts, getFilteredPost(posts, selectedTags))}
      </PostsList>
    </Fragment>
  )
}

export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts({
    fields: ["title", "spoiler", "updated", "tags", "slug"],
  })
  const uniqueTags = posts
    .flatMap(({tags}) => tags)
    .filter((tag, i, list) => list.indexOf(tag) === i)

  return {
    props: {
      posts,
      uniqueTags,
    },
  }
}
