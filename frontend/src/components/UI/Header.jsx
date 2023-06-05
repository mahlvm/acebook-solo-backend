import style from './Header.module.css';

const Header = () => {
  return (
    <navbar className={style['header--container']}>
        <div className={style['header--title']}>
          <h1>ACEBOOK</h1>
        </div>
      </navbar>
  );
};

export default Header;