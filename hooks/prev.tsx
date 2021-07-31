import {MutableRefObject, useEffect, useRef} from "react"

function usePrevious<T>(initialValue: T) {
  const ref: MutableRefObject<T | undefined> = useRef()

  useEffect(() => {
    ref.current = initialValue
  }, [initialValue])

  return ref.current
}

export default usePrevious
