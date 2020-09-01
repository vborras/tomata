import React, {useEffect, useState} from 'react';

function Timer() {
  const [delta, setDelta] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (delta > 0 && isActive) {
      const interval = setInterval(() => {
        setDelta(delta - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [delta, isActive]);

  const secondsDifference = (Math.floor(delta % 60)).toString()
      .padStart(2, '0');
  const minutesDifference = (Math.floor(delta / 60)).toString()
      .padStart(2, '0');

  return (
      <div className="timer">
        <h1 data-testid="countdown">{minutesDifference}:{secondsDifference}</h1>
        {isActive && <button data-testid="pause-button"
                             onClick={() => setIsActive(false)}>
          Pause
        </button>}
        {!isActive && <button data-testid="activation-button"
                              onClick={() => setIsActive(true)}>
          Activate
        </button>}
      </div>
  );
}

export default Timer;
