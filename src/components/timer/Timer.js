import React, {useEffect, useState} from 'react';
import styles from './Timer.module.css'
import {Button} from '../button/Button';

const SEQUENCE = [25, 5];

function Timer() {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [delta, setDelta] = useState(SEQUENCE[currentSequenceIndex] * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (delta > 0 && isActive) {
      const interval = setInterval(() => {
        setDelta(delta - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [delta, isActive]);

  useEffect(() => {
    if (delta === 0 && isActive) {
      setIsActive(false);
      setCurrentSequenceIndex(currentSequenceIndex === SEQUENCE.length - 1
          ? 0
          : currentSequenceIndex + 1);
    }
  }, [delta, isActive]);

  useEffect(() => {
    setDelta(SEQUENCE[currentSequenceIndex] * 60)
  }, [currentSequenceIndex])

  useEffect(() => {
    if (delta === 0) {
      const audio = new Audio(require('../../assets/alarm.mp3'))
      audio.play()
    }
  }, [delta])

  const secondsDifference = (Math.floor(delta % 60)).toString()
      .padStart(2, '0');
  const minutesDifference = (Math.floor(delta / 60)).toString()
      .padStart(2, '0');

  return (
      <div className={styles.timer}>
        <h1 data-testid="countdown" className={styles.countdown}>
          {`${minutesDifference}:${secondsDifference}`}
        </h1>
        {isActive && <Button data-testid="pause-button"
                             onClick={() => setIsActive(false)}>
          Pause
        </Button>}
        {!isActive && <Button data-testid="activation-button"
                              onClick={() => setIsActive(true)}>
          Activate
        </Button>}
      </div>
  );
}

export default Timer;
