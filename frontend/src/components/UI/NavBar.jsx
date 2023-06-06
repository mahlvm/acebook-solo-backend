
import React from 'react';
import style from './NavBar.module.css';
import NavBarBtn from './NavBarBtn';

const NavBar = (props) => {
  const navbarBtns = [
    { name: 'Home', fn: () => props.posts() },
    { name: 'Account', fn: () => props.account() },
    { name: 'Logout', fn: () => props.logout() }
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

          {/* <button className={style['navbar__btn']}>Photos</button>
          <button className={style['navbar__btn']} onClick={account}>Account</button>
          <button className={style['navbar__btn']} onClick={post}>Posts</button>
          <button className={style['navbar__btn']} onClick={logout}>Logout</button> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;