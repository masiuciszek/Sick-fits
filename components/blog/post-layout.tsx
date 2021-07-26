import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {colors, fonts, sizes} from "@styles/styled-record"
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
    &:after {
      content: "";
      position: absolute;
      top: 1px;
      left: 0;
      width: 10px;
      height: 10px;
      z-index: -1;
      opacity: 0.2;
      background-color: ${colors.colorTextPrimary};
    }
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
`

interface Props {}

const PostLayout: React.FC<Props> = ({children}) => {
  return <Layout>{children}</Layout>
}
export default PostLayout
