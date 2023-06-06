import style from './SubmitButton.module.css';

const SubmitButton = (props) => {
  return <input className={style['submit-btn']} type="submit" value={props.value} />;
};

export default SubmitButton;