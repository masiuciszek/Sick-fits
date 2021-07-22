import Button from "@components/elements/button"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {useState} from "react"

const Aside = styled.aside`
  border: 1px solid #000;
  max-width: ${pxToRem(400)};
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .buttons {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 1rem 0;
  }
`

const btnStyles = css`
  border: 1px solid ${colors.colorGray700};
  font-size: ${pxToRem(16)};
  width: ${pxToRem(120)};
  height: ${pxToRem(40)};
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowLg};
`

const Counter = () => {
  const [state, setState] = useState(0)
  return (
    <Aside>
      <h1>count is {state}</h1>
      <div className="buttons">
        <Button
          incomingStyles={btnStyles}
          onClick={() => setState((prevState) => prevState + 1)}
        >
          increment
        </Button>
        <Button
          incomingStyles={btnStyles}
          onClick={() => setState((prevState) => prevState - 1)}
        >
          decrement
        </Button>
      </div>
    </Aside>
  )
}

export default Counter
