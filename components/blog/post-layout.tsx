import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {
  borderRadius,
  colors,
  elevations,
  fonts,
  sizes,
} from "@styles/styled-record"
import React from "react"

const Layout = styled.article`
  h1 {
    font-size: ${sizes.h3};
    span {
      border-bottom: 1px solid ${colors.colorHighlight};
      font-family: ${fonts.operaorMonoHco};
    }
  }
  code {
    font-size: ${pxToRem(16)};
    color: ${colors.colorHighlight};
    font-family: ${fonts.operaorMono};
    font-weight: 500;
    position: relative;
    background-color: ${colors.colorGray300};
    padding: ${pxToRem(3)};
    border-radius: ${borderRadius.borderRadiusM};
    box-shadow: ${elevations.shadowMd};
  }
  ul {
    list-style: square;
  }
  p {
    margin-bottom: 0.75rem;
    line-height: 0.85cm;
  }
  strong {
    font-family: ${fonts.operaorMono};
    border-bottom: 2px solid ${colors.colorHighlight};
    font-weight: 600;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      top: 0.4rem;
      left: 0;
      background-color: ${colors.colorHighlight};
      width: 95%;
      height: 0.75rem;
      opacity: 0.2;
      z-index: -1;
      transform: rotate(-1deg);
    }
  }
  blockquote {
    position: relative;
    padding: 0.2rem 0.4rem;
    background-color: ${colors.colorGray200};
    margin-bottom: 1.5rem;
    &:after {
      position: absolute;
      content: "”";
      color: ${colors.colorTextPrimary};
      font-size: 7rem;
      line-height: 0;
      bottom: -23px;
      right: 30px;
      opacity: 0.55;
    }
    p {
      margin-left: 0.5rem;
      font-style: italic;
      opacity: 0.8;
      font-family: ${fonts.operaorMono};
    }
  }
`

const PostLayout: React.FC = ({children}) => {
  return <Layout>{children}</Layout>
}
export default PostLayout
