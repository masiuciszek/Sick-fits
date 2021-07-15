import {colors} from "@styles/styled-record"
import React from "react"

interface Props {
  width?: number
  height?: number
}

const enter: React.FC<Props> = ({width = 35, height = 35}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="176 104 176 136 80 136"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
      <polyline
        points="104 112 80 136 104 160"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
      <rect
        x="32"
        y="48"
        width="192"
        height="160"
        rx="8"
        strokeWidth="16"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></rect>
    </svg>
  )
}
export default enter
