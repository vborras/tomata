import React from 'react';
import styles from './Button.module.css';

export const Button = ({children, onClick, className = ''}) => {
  return (
      <button onClick={onClick} className={className + ' ' + styles.button}>
        {children}
      </button>
  );
};
