import { forwardRef } from 'react'

import style from './Input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} {...props.input} onBlur={props.onBlur ? props.onBlur : null} className={style[props.style]} required={props.required} />
  );
});

export default Input;
