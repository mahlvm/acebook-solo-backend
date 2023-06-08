import EmptyPage from '../EmptyPage';
import Post from '../../Post/Post';
import MainContext from '../../../context/mainContext';

import { useContext } from 'react';
import style from './Feed.module.css';

const Feed = ({ posts }) => {
  const mainContext = useContext(MainContext)

  const loadPosts = () => {
    if (posts.length === 0) { return <EmptyPage /> }
    else {
      return posts.map((post) => {
        return <Post post={post} userData={mainContext.userData} key={post._id} />
      })
    }
  }

  return (
    <div id='feed' role="feed">
      { loadPosts() }
    </div>
  );
};

export default Feed;