import DownArrow from "@components/icons/down-arrow"
import UpArrow from "@components/icons/up-arrow"
import {css} from "@emotion/react"
import useShowScroll from "@hooks/show-scroll"
import {buttonResetStyles} from "@styles/css-helpers"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"

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
  const [showScroll, scrollToHandler] = useShowScroll({limit: 800})
  console.log({showScroll})
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

export default ScrollToButton
