import {BIRTH_DATE, STARTING_DATE} from "@utils/constants"
import {useState} from "react"

import useCallbackFn from "./callback-fn"

function usePersonDateInfo({
  startingDate = STARTING_DATE,
  birth = BIRTH_DATE,
  updated = 6000,
}) {
  const [timeSinceStarting, setTime] = useState(Date.now() - startingDate)
  const [age, setAge] = useState(Date.now() - birth)

  useCallbackFn(() => {
    setTime(Date.now() - startingDate)
    setAge(Date.now() - birth)
  }, updated)

  return {
    timeSinceStarting,
    timeAsYears: Math.floor(timeSinceStarting / 1000 / 60 / 60 / 24 / 365),
    timeAsDays: Math.floor(timeSinceStarting / 1000 / 60 / 60 / 24),

    age,
    // milliseconds, / scends / minutes / hours / and days
    ageAsYears: Math.floor(age / 1000 / 60 / 60 / 24 / 365),
  }
}

export default usePersonDateInfo
