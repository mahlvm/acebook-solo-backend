
import style from './UserBanner.module.css'

const UserBanner = ({ userData }) => {
  
  return (
    <>
      <div className={style['user-banner__inner-container']}> 
        <div className={style['user-banner__img']}>
          <img src={ userData.avatar }></img>
        </div>
        <div className={style['user-banner__info']}>
          <h2>{ userData.username }</h2>
          <p>{ userData.email }</p>
        </div>
      </div>
    </>
  );
}

export default UserBanner;