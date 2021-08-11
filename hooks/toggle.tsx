import {useState} from "react"

type Fn = () => void
type HandlerList = [boolean, Fn, Fn, Fn]
interface ToggleReturnType {
  state: boolean
  toggle: () => void
  toTrue: () => void
  toFalse: () => void
  handlersList: HandlerList
}

const useToggle = (initialState = false): ToggleReturnType => {
  const [state, setState] = useState(initialState)

  const toTrue = (): void => {
    setState(true)
  }
  const toFalse = (): void => {
    setState(false)
  }
  const toggle = (): void => {
    setState((prev) => !prev)
  }

  const handlersList: HandlerList = [state, toggle, toFalse, toTrue]

  return {state, toggle, toFalse, toTrue, handlersList}
}

export default useToggle
