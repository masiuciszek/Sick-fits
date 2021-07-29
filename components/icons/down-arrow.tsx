import {colors} from "@styles/styled-record"

interface Props {
  width?: number
  height?: number
}
const DownArrow = ({width = 30, height = 30}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={colors.colorTextText}
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="128"
      y1="40"
      x2="128"
      y2="216"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></line>
    <polyline
      points="56 144 128 216 200 144"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></polyline>
  </svg>
)

export default DownArrow
