import { forwardRef } from 'react'

import style from './Input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} {...props.input} className={style[props.style]} required={props.style === 'input'} />
  );
});

export default Input;
