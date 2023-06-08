import style from './PostContent.module.css';

const PostContent = ({ post }) => {
  const withImage = 'image' in post // boolean: check if post has an image
  let imageLocation;
  if (withImage) { imageLocation = `/uploads/${post.image.fileName}` }

  return (
    <div className={style['post-content__container']}>
      <article data-cy="post" className={style["post-content__text"]} key={post._id}>{post.message}</article>
      <div className={style["post-content__image"]}>
        {withImage ? <img src={imageLocation}></img> : null }
      </div>
    </div>
  );
};

export default PostContent;