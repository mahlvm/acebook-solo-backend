import style from './ErrorMessage.module.css'

const ErrorMessage = (props) => {
  return (
    <div className={style["error-message__container"]}>
      <p className={style["error-message"]}>{props.message}</p>
    </div>
  );
};

export default ErrorMessage;