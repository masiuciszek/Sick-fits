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
import {ChangeEvent, Fragment, useState} from "react"

import {getAllPosts} from "../../lib/api"
import {getFilteredPost} from "../../lib/app-utils"

interface Props {
  posts: PostItemType[]
  uniqueTags: Array<string>
}

const PostsList = styled.ul`
  ${flexColumn()};
`

const Tags = styled.ul`
  ${flexRow({justifyContent: "space-evenly"})}
  width: 40rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const TagItem = styled.li`
  background-color: ${colors.colorTextPrimary};
  min-width: 3em;
  text-align: center;
  border-radius: ${borderRadius.borderRadiusS};
  padding: 0.2rem;
  color: ${colors.colorBgBackground};
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
          <TagItem key={tag}>
            <CheckBox
              tag={tag}
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
          </TagItem>
        ))}
      </Tags>
      <PostsList>
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

interface P {
  tag: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const CheckBox = ({tag, onChange}: P) => (
  <label
    htmlFor={`tag-${tag}`}
    css={css`
      position: relative;

      input[type="checkbox"] {
        opacity: 0;
        width: 1em;
        height: 1em;
        position: absolute;
        top: 0.2em;
        right: 0;
        z-index: 2;
      }
      .checkbox__control {
        display: inline-grid;
        width: 1em;
        height: 1em;
        border-radius: 0.25em;
        border: 0.1em solid currentColor;
        margin-left: 0.5em;
      }
      svg {
        transition: transform 0.1s ease-in 25ms;
        transform: scale(0);
        transform-origin: bottom left;
      }

      input[type="checkbox"]:checked + .checkbox__control svg {
        transform: scale(1);
      }
    `}
  >
    {tag}
    <input type="checkbox" onChange={onChange} />
    <span className="checkbox__control">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          d="M1.73 12.91l6.37 6.37L22.79 4.59"
        />
      </svg>
    </span>
  </label>
)
