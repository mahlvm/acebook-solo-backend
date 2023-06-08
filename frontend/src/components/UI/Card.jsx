import style from './Card.module.css';

const Card = (props) => {
  return (
    <div className={style['card']}>
      {/* <h1>{props.title}</h1> */}
      {props.children}
    </div>
  );
};

export default Card;