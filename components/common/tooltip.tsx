import {css, SerializedStyles} from "@emotion/react"
import styled from "@emotion/styled"
import useToggle from "@hooks/toggle"
import {pxToRem} from "@styles/css-helpers"
import {borderRadius, colors, fonts} from "@styles/styled-record"
import {motion} from "framer-motion"

import AnimateWrapper from "./animate-wrapper"

interface Props {
  title: string
  ariaLabel: string
  incomingStyles?: SerializedStyles
}

const Wrapper = styled(motion.div)`
  position: relative;
`

const variants = {
  initial: {opacity: 0, y: 6, scale: 0.75},
  animate: {opacity: 1, y: 0, scale: 1},
}

const Tooltip: React.FC<Props> = ({
  title,
  ariaLabel,
  children,
  incomingStyles,
}) => {
  const {state, toTrue, toFalse} = useToggle()

  return (
    <Wrapper
      onMouseEnter={toTrue}
      onMouseLeave={toFalse}
      onFocus={toTrue}
      onBlur={toFalse}
    >
      <AnimateWrapper isOn={state}>
        <motion.span
          aria-hidden={state}
          aria-label={ariaLabel}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.17,
          }}
          css={css`
            position: absolute;
            right: 0;
            bottom: -60%;
            font-size: ${pxToRem(12)};
            pointer-events: none;
            white-space: nowrap;
            z-index: 6;
            max-width: ${pxToRem(50)};
            background-color: ${colors.colorGray300};
            padding: 0.4rem;
            border-radius: ${borderRadius.borderRadiusM};
            ${incomingStyles};
            user-select: none;
            font-family: ${fonts.operaorMonoHco};
          `}
          role="tooltip"
        >
          {title}
        </motion.span>
      </AnimateWrapper>

      {children}
    </Wrapper>
  )
}
export default Tooltip
