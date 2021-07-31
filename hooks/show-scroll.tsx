import {useCallback, useEffect, useState} from "react"

interface ShowScroll {
  limit?: number
}

type ReturnType = [boolean, () => void]

const useShowScroll = ({limit = 700}: ShowScroll = {}): ReturnType => {
  const [showScroll, setShowScroll] = useState(false)
  const scrollToHandler = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }
  const handleScroll = useCallback(() => {
    const IsOverLimit = window.pageYOffset > limit
    if (IsOverLimit) {
      setShowScroll(true)
    } else {
      setShowScroll(false)
    }
  }, [limit])

  useEffect(() => {
    // const isOverLimit = window.pageYOffset > limit
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return [showScroll, scrollToHandler]
}

export default useShowScroll
