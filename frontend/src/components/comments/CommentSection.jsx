import { useContext } from 'react';
import style from './CommentSection.module.css'

import Comments from './Comments';
import MainContext from '../../context/mainContext';

const CommentSection = ({ ownerData, comments, isVisible }) => {
  const mainContext = useContext(MainContext)
  
  return (
    <div className={isVisible ? style['open'] : style['close']}>
    {comments.map(
      comment => (<Comments comment={comment} userData={ mainContext.userData } ownerData={ownerData} key={comment._id} />)
    )}
    </div>
  );
};

export default CommentSection;