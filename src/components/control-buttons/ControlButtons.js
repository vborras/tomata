import React from 'react';
import {Button} from '../button/Button';
import buttonStyles from '../button/Button.module.css';
import styles from './ControlButtons.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faTimes} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faPlay, faPause, faTimes);

const ControlButtons = ({isActive, setActive, setInactive, skip}) => {
  return (
      <>
        {isActive && <Button data-testid="pause-button" onClick={setInactive}>
          Pause
          <FontAwesomeIcon icon="pause" className={styles.icon} />
        </Button>}
        {!isActive &&
        <Button data-testid="activation-button" onClick={setActive}>
          Start
          <FontAwesomeIcon icon="play" className={styles.icon} />
        </Button>}
        <Button data-testid="skip-button"
                className={buttonStyles['button--outline']}
                onClick={skip}>
          Skip
          <FontAwesomeIcon icon="times" className={styles.icon} />
        </Button>
      </>
  );
};

export default ControlButtons;
