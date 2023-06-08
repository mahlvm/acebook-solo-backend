import style from './PostHeader.module.css';

const PostHeader = ({ownerData, post}) => {
  const dateObj = new Date(post.createdAt)
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const humanReadableTime = dateObj.toLocaleString('en-GB', options).replace(/,/g, '');

  return (
    <div className={style["post-header__container"]}>
      <div className={style["post-header__avatar"]}>
        <img alt="avatar" src={ownerData.avatar}></img>
      </div>
      <div className={style["post-header__post-info"]}>
        <h3>{ownerData.username}</h3>
        <time dateTime={post.createdAt}>{humanReadableTime}</time>
      </div>
    </div>
  );
};

export default PostHeader;