import {useCallback, useEffect, useState} from "react"

import useHasMounted from "./has-mounted"

interface ShowScroll {
  limit?: number
}

type ReturnType = [boolean, () => void]

const useShowScroll = ({limit = 700}: ShowScroll = {}): ReturnType => {
  const [showScroll, setShowScroll] = useState(false)
  const [prevScroll, setPrevScroll] = useState(0)
  const hasMounted = useHasMounted()
  const scrollToHandler = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }
  const yScroll = hasMounted ? window.scrollY : 0
  const handleScroll = useCallback(() => {
    const IsOverLimit = window.pageYOffset > limit
    if (yScroll < prevScroll && IsOverLimit) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
    setPrevScroll(yScroll)
  }, [limit, prevScroll, yScroll])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return [showScroll, scrollToHandler]
}

export default useShowScroll
