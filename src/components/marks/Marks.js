import React from 'react';
import style from './Marks.module.css';

export const Marks = ({time}) => {
  return (
      <div className={style.marks}
           style={{marginLeft: `${-3600 - time - 150}px`}}>
        {[...Array(12).keys()].map(key => (
            <div className={style.number} key={key}>{key * 5}</div>
        ))}
      </div>
  );
};
