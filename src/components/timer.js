import React from 'react';

function Timer() {
  const delta = 25 * 60;

  const secondsDifference = (delta % 60).toString().padStart(2, '0');
  const minutesDifference = (parseInt(delta / 60)).toString().
      padStart(2, '0');

  return (
      <h1 data-testid="timer">{minutesDifference}:{secondsDifference}</h1>
  );
}

export default Timer;
