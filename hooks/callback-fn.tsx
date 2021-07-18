import {MutableRefObject, useEffect, useRef} from "react"

const useCallBackFn = (callback: () => void, delay: number) => {
  const savedCallback = useRef() as MutableRefObject<() => void>
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useCallBackFn
