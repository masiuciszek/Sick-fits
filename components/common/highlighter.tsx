import {css, SerializedStyles} from "@emotion/react"
import {colors} from "@styles/styled-record"
import {FC} from "react"

const styles = css`
  color: ${colors.colorHighlight};
  background: transparent;
`

interface Props {
  incomingStyles?: SerializedStyles
}

const Highlighter: FC<Props> = ({children, incomingStyles}) => (
  <mark
    css={css`
      ${styles};
      ${incomingStyles};
    `}
  >
    {children}
  </mark>
)

export default Highlighter
