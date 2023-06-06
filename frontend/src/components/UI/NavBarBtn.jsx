import style from './NavBarBtn.module.css';

const NavBarBtn = (props) => {
  return <button className={style['navbar__btn']} onClick={() => props.fn()}>{props.name}</button>;
};

export default NavBarBtn;