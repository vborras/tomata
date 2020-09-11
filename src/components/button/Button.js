import React from 'react';
import styles from './Button.module.css';

export const Button = ({children, onClick, className = '', ...rest}) => {
  return (
      <button onClick={onClick} className={className + ' ' + styles.button} {...rest}>
        {children}
      </button>
  );
};
