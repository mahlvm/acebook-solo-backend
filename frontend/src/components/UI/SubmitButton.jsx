import style from './SubmitButton.module.css';

const SubmitButton = (props) => {
  return <input className={style[props.style]} type="submit" value={props.value} />;
};

export default SubmitButton;