import Hash from "@components/icons/hash"
import {formatDate} from "@utils/helpers"
import Link from "next/link"
import {FC} from "react"

import {StyledItem, TagsList} from "./styles"
import {PostItemType} from "./types"

const PostItem: FC<PostItemType> = ({title, spoiler, updated, tags, slug}) => (
  <StyledItem>
    <p className="title-and-date">
      {title} <span>{formatDate(updated)}</span>{" "}
    </p>
    <p className="spoiler">{spoiler}</p>
    <TagsList>
      {tags.map((tag) => (
        <li key={tag}>
          <Hash /> {tag}
        </li>
      ))}
      <li className="list-item-link">
        <Link href={`/blog/${slug}`}>
          <a>To {title} &#8594;</a>
        </Link>
      </li>
    </TagsList>
  </StyledItem>
)

export default PostItem
