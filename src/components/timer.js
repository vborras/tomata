import React from 'react';
import {useState} from 'react';
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInSeconds from 'date-fns/differenceInSeconds'

function Timer () {
  const currentTime = new Date()

  const [endTime, setEndTime] = useState(currentTime);

  const secondsDifference = differenceInSeconds(endTime, currentTime).toString().padStart(2, '0')
  const minutesDifference = differenceInMinutes(endTime, currentTime).toString().padStart(2, '0')

  return (
      <h1 data-testid="timer">{minutesDifference}:{secondsDifference}</h1>
  )
}

export default Timer
