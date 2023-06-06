import style from './Prompt.module.css';

const Prompt = (props) => {
  return <p className={style['prompt__message']}>{props.message}<a href={props.href} className={style['prompt__link']}>{ props.link }.</a></p>;
};

export default Prompt;