import ScrollToButton from "@components/blog/scroll-to-btn"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
// import useMediaQuery from "@hooks/media-query"
import usePrevious from "@hooks/prev"
import {pxToRem} from "@styles/css-helpers"
// import {above} from "@styles/media-query"
import {
  borderRadius,
  colors,
  elevations,
  fonts,
  sizes,
} from "@styles/styled-record"
import {motion, useElementScroll} from "framer-motion"
import {FC, useRef, useState} from "react"

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
  overflow: auto;
  height: 100vh;
  position: relative;
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
  ${tableStyles};
`

// const progressStyles = (progress: number) => {
//   const result = progress * 20
//   return css`
//     width: ${result}rem;
//     background-color: ${colors.colorTextPrimary};
//     height: 2vh;
//     position: fixed;
//     top: 70px;
//     left: 50px;
//     font-size: 100px;
//     z-index: -1;
//     border-radius: ${borderRadius.borderRadiusM};
//   `
// }

const PostLayout: FC = ({children}) => {
  const ref = useRef<HTMLElement>(null)
  const {scrollYProgress} = useElementScroll(ref)
  const [progress, setProgress] = useState(0)
  // const aboveTablet = useMediaQuery(above.tablet)

  scrollYProgress.onChange(setProgress)
  const previousProgress = usePrevious(progress) as number

  // const scale = useTransform(
  //   scrollYProgress,
  //   [0, 0.33, 0.66, 1],
  //   [0.5, 0.75, 0.5, 1],
  // )

  const scrollToHandler = (): void => {
    if (ref.current) {
      ref.current.scrollTo({top: 0, behavior: "smooth"})
    }
  }

  return (
    <Layout ref={ref}>
      {/* {aboveTablet && (
        <motion.div style={{scale}} css={progressStyles(progress)} />
      )} */}
      <motion.aside>
        {children}

        {progress > 0.15 && (
          <ScrollToButton
            icon="up-arrow"
            showScroll={progress > 0.15 && progress < previousProgress}
            scrollToHandler={scrollToHandler}
          />
        )}
      </motion.aside>
    </Layout>
  )
}
export default PostLayout
