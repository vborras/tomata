import React, {useEffect, useState} from 'react';

function Timer() {
  const [delta, setDelta] = useState(25 * 60);

  useEffect(() => {
    if (delta > 0) {
      const interval = setInterval(() => {
        setDelta(delta - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [delta]);

  const secondsDifference = (Math.floor(delta % 60)).toString()
      .padStart(2, '0');
  const minutesDifference = (Math.floor(delta / 60)).toString()
      .padStart(2, '0');

  return (
      <h1 data-testid="timer">{minutesDifference}:{secondsDifference}</h1>
  );
}

export default Timer;
