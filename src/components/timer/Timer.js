import React, {useEffect, useState} from 'react';
import styles from './Timer.module.css';
import {Marks} from '../marks/Marks';
import Countdown from '../countdown/Countdown';
import ControlButtons from '../control-buttons/ControlButtons';

const WORK_TIME = 25;
const REST_TIME = 5;

const WORK_STATE = 'work';
const REST_STATE = 'rest';

const TIMES = {
  [WORK_STATE]: WORK_TIME,
  [REST_STATE]: REST_TIME,
};

function Timer() {
  const [currentState, setCurrentState] = useState(WORK_STATE);
  const [delta, setDelta] = useState(TIMES[currentState] * 60);
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
      setCurrentState(currentState => currentState === WORK_STATE
          ? REST_STATE
          : WORK_STATE);
    }
  }, [delta, isActive]);

  useEffect(() => {
    setDelta(TIMES[currentState] * 60);
  }, [currentState]);

  useEffect(() => {
    if (delta === 0) {
      const audio = new Audio(require('../../assets/alarm.mp3'));
      audio.play();
    }
  }, [delta]);

  const skip = () => {
    setCurrentState(WORK_STATE);
    setDelta(TIMES[currentState] * 60);
    setIsActive(false);
  };

  return (
      <div className={styles.timer}>
        <Marks time={delta}/>
        <Countdown delta={delta}/>
        <ControlButtons isActive={isActive} setActive={() => setIsActive(true)}
                        setInactive={() => setIsActive(false)} skip={skip}/>
      </div>
  );
}

export default Timer;
