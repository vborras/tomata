import React from 'react';
import styles from './Countdown.module.css';

const Countdown = ({delta}) => {

  const secondsDifference = (Math.floor(delta % 60)).toString()
      .padStart(2, '0');
  const minutesDifference = (Math.floor(delta / 60)).toString()
      .padStart(2, '0');

  return (
      <h1 data-testid="countdown" className={styles.countdown}>
        {`${minutesDifference}:${secondsDifference}`}
      </h1>
  );
};

export default Countdown;
