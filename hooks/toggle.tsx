import {useMemo, useState} from "react"
interface ToggleMap {
  state: boolean
  toggle: () => void
  toTrue: () => void
  toFalse: () => void
}
type Fn = () => void
type ToggleReturnType = [boolean, Fn, Fn, Fn, ToggleMap]

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

  const handlers = useMemo(
    () => ({
      state,
      toTrue,
      toFalse,
      toggle,
    }),
    [state],
  )

  return [state, toggle, toFalse, toTrue, handlers]
}

export default useToggle
