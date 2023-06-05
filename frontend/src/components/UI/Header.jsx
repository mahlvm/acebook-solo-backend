import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style['header--container']}>
        <div className={style['header--title']}>
          <h1>ACEBOOK</h1>
        </div>
    </div>
  );
};

export default Header;