import {css, SerializedStyles} from "@emotion/react"
import {buttonResetStyles, pxToRem} from "@styles/css-helpers"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"
import {FC} from "react"

type BtnType = "solid" | "default" | "primary"

export const buttonStyles = css`
  color: ${colors.colorTextText};
  border: 2px solid ${colors.colorTextText};
  min-width: ${pxToRem(90)};
  font-size: ${pxToRem(17)};
  height: ${pxToRem(35)};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowLg};
  transition: background 300ms ease-out;
  color: ${colors.colorBgBackground};
  background-color: ${colors.colorHighlight};
`

const styles = (type: BtnType) => css`
  ${buttonResetStyles};
  ${type === "solid" ? buttonStyles : null};
  width: 4rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface Props {
  incomingStyles?: SerializedStyles
  text?: string
  onClick?: () => void
  config?: Record<
    string,
    string | boolean | number | Record<string, string | boolean | number>
  >
  type?: BtnType
  isDisabled?: boolean
}

const Button: FC<Props> = ({
  incomingStyles,
  text,
  onClick,
  children,
  config,
  type = "default",
  isDisabled,
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      css={css`
        ${styles(type)};
        ${incomingStyles ? incomingStyles : null};
      `}
      {...config}
    >
      {text !== undefined ? text : children}
    </motion.button>
  )
}

export default Button
