import Highlighter from "@components/common/highlighter"
import Title from "@components/common/title"
import Twitter from "@components/icons/twitter"
import Wave from "@components/icons/wave"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {colors} from "@styles/styled-record"
import Link from "next/link"

const Intro = () => (
  <Title incomingStyles={styles}>
    <h1>
      <span>
        Hello, I&#39;m Marcell, and this is my personal site/blog.
        <Wave />{" "}
      </span>
      <span>
        {" "}
        Here is where I share my thoughts , ideas and experience as a software
        developer, and everything that interests me that I would love to share
        Topics like <Highlighter>computer science</Highlighter>,{" "}
        <Highlighter>React</Highlighter>,{" "}
        <Highlighter>software engineering</Highlighter>, and a good{" "}
        <Highlighter>user experience</Highlighter> are close to my heart.
      </span>
    </h1>
    <LinkWrapper>
      <Link href="/about">About me &#8599; </Link>
      <a href="https://twitter.com/masiu_cd">
        @masiu_cd <Twitter />
      </a>
    </LinkWrapper>
  </Title>
)

export default Intro

const styles = css`
  background-color: ${colors.colorBgBackground};
  padding: 2rem;
  h1 {
    font-size: ${pxToRem(32)};
  }
  span {
    &:nth-of-type(1) {
      color: ${colors.colorTextText};
    }
    &:nth-of-type(2) {
      color: ${colors.colorGray600};
    }
  }
`

const LinkWrapper = styled.div`
  max-width: 25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${colors.colorTextPrimary};
    display: flex;
    position: relative;
    align-items: center;
    svg {
      margin-left: 0.3rem;
    }
    &:after {
      transition: 400ms ease-in-out width;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${colors.colorGray800};
      height: 3px;
      width: 0;
    }
    &:hover {
      &:after {
        width: 90%;
      }
    }
  }

  font-size: ${pxToRem(15)};
  @media ${above.mobileL} {
    font-size: ${pxToRem(20)};
  }
`
