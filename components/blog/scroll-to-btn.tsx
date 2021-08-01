import DownArrow from "@components/icons/down-arrow"
import UpArrow from "@components/icons/up-arrow"
import {css} from "@emotion/react"
import {buttonResetStyles} from "@styles/css-helpers"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"

type IconType = "up-arrow" | "down-arrow"
interface ScrollToButtonProps {
  icon: IconType
  showScroll: boolean
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
const ScrollToButton = ({icon, showScroll}: ScrollToButtonProps) => {
  const scrollToHandler = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  return (
    <motion.button
      initial={{opacity: 0}}
      animate={{opacity: showScroll ? 1 : 0}}
      exit={{opacity: 0}}
      disabled={!showScroll}
      transition={{opacity: {duration: 0.2}}}
      whileHover={{
        scale: 1.05,
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
        background-color: ${colors.colorTextText};
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
