import React from 'react';
import {Button} from '../button/Button';
import buttonStyles from '../button/Button.module.css';

const ControlButtons = ({ isActive, setActive, setInactive, skip}) => {
  return (
      <>
        {isActive && <Button data-testid="pause-button" onClick={setInactive}>
          Pause
        </Button>}
        {!isActive && <Button data-testid="activation-button" onClick={setActive}>
          Start
        </Button>}
        <Button data-testid="skip-button" className={buttonStyles['button--outline']}
                onClick={skip}>Skip</Button>
      </>
  )
}

export default ControlButtons
