import {act, renderHook} from "@testing-library/react-hooks"

import useToggle from "../toggle"

describe("useToggle", () => {
  test("should toggle from false to true in a expected way", () => {
    const {result} = renderHook(() => useToggle())

    // initialState is set to false
    expect(result.current[0]).toBeFalsy()

    // we now change the state to true
    act(() => {
      result.current[1]()
    })

    // state should be true
    expect(result.current[0]).toBeTruthy()

    // we set it back to false
    act(() => {
      result.current[2]()
    })

    // state should be false
    expect(result.current[0]).toBeFalsy()

    // we toggle the current state
    act(() => {
      result.current[1]()
    })

    // state should be true
    expect(result.current[0]).toBeTruthy()

    // we toggle the current state
    act(() => {
      result.current[1]()
    })

    // state should be false
    expect(result.current[0]).toBeFalsy()
  })
})
