import { forwardRef } from 'react'

import style from './InputForm.module.css';

const InputForm = forwardRef((props, ref) => {
  return (
    <input ref={ref} {...props.input} className={style['input']} required />
  );
});

export default InputForm;
