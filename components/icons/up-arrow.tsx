import {colors} from "@styles/styled-record"

interface Props {
  width?: number
  height?: number
}
const UpArrow = ({width = 30, height = 30}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="128"
      y1="216"
      x2="128"
      y2="40"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></line>
    <polyline
      points="56 112 128 40 200 112"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></polyline>
  </svg>
)

export default UpArrow
