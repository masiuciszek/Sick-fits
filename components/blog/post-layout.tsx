import ScrollToButton from "@components/blog/scroll-to-btn"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import useMediaQuery from "@hooks/media-query"
import usePrevious from "@hooks/prev"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {
  borderRadius,
  colors,
  elevations,
  fonts,
  sizes,
} from "@styles/styled-record"
import {motion, useTransform, useViewportScroll} from "framer-motion"
import {FC, useState} from "react"

const LIMIT_SHOW_SCROLL_UPP_BUTTON = 0.15

const tableStyles = css`
  table {
    box-shadow: ${elevations.shadowMd};
    margin-bottom: 1.5rem;
    thead {
      background-color: ${colors.colorTextText};
      color: ${colors.colorBgBackground};
      th {
        font-size: 1.2rem;
        padding: 0.2rem;
      }
    }
    tbody {
      tr {
        background-color: ${colors.colorGray100};
        td {
          padding: 0.5rem 0.25rem;
          box-shadow: ${elevations.shadowInner};
        }
      }
    }
  }
`

const Layout = styled.section`
  /* overflow: auto;
  height: 100vh;
  position: relative; */
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
  a {
    color: ${colors.colorTextPrimary};
    font-style: italic;
    font-family: ${fonts.radnika};
    border-bottom: 1px solid ${colors.colorTextPrimary};
  }
  ${tableStyles};
`

const progressStyles = (progress: number) => {
  const result = progress * 25
  return css`
    width: 1vh;
    background-color: ${colors.colorTextPrimary};
    height: ${result}rem;
    position: fixed;
    top: 70px;
    left: 5px;
    font-size: 100px;
    z-index: -1;
    border-radius: ${borderRadius.borderRadiusM};
  `
}

const PostLayout: FC = ({children}) => {
  const {scrollYProgress} = useViewportScroll()
  const [progress, setProgress] = useState(0)
  const aboveTablet = useMediaQuery(above.tablet)
  scrollYProgress.onChange(setProgress)
  const previousProgress = usePrevious(progress) as number

  const scale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.5, 0.75, 0.5, 1],
  )

  const scrollToHandler = (): void => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  return (
    <Layout>
      {aboveTablet && (
        <motion.div style={{scale}} css={progressStyles(progress)} />
      )}
      <motion.article>
        {children}
        {progress > LIMIT_SHOW_SCROLL_UPP_BUTTON && (
          <ScrollToButton
            icon="up-arrow"
            showScroll={
              progress > LIMIT_SHOW_SCROLL_UPP_BUTTON &&
              progress < previousProgress
            }
            scrollToHandler={scrollToHandler}
          />
        )}
      </motion.article>
    </Layout>
  )
}
export default PostLayout
