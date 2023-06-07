
import React, { useContext } from 'react';
import style from './NavBar.module.css';
import NavBarBtn from './NavBarBtn';
import MainContext from '../../context/mainContext';

const NavBar = (props) => {
  const mainContext = useContext(MainContext)
  const navbarBtns = [
    { name: 'Home', fn: () => mainContext.navigateTo.posts() },
    { name: 'Account', fn: () => mainContext.navigateTo.account() },
    { name: 'Logout', fn: () => mainContext.navigateTo.logout() }
  ]
  return (
    <div className={style['navbar__container']}>
      <nav className={style['navbar']}>
        <h1>ACEBOOK</h1>
        <div className={style['navbar__btns']}>
          {navbarBtns.map(btn => {
            if(btn.name !== props.currentPage)
            return <NavBarBtn key={btn.name} fn={btn.fn} name={btn.name} />
          })}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;