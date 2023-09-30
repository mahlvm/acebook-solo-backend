import CommentContext from '../comments/CommentSection';

import style from './PostCounters.module.css';
import { useContext } from 'react';

const PostCounters = ({handleLikes, likes, hasLiked}) => {
  const commentContext = useContext(CommentContext)

  return (
    <div className={style['post-counters']}>
      <button className={style['post-counter']} onClick={handleLikes}>
        <i className={hasLiked ? "fa-sharp fa-solid fa-heart fa-lg" : "fa-regular fa-heart fa-lg"}></i>
      </button>
      <button className={style['post-counter']} onClick={handleLikes}>{likes} like{likes === 0 || likes > 1 ? "s" : "" }</button>
      <button className={style['post-counter']} onClick={commentContext.toggleComments} >{commentContext.comments.length} comment{commentContext.comments.length === 0 || commentContext.comments.length > 1 ? "s" : "" }</button>
    </div>
  );
};

export default PostCounters;