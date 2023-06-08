import style from './EmptyPage.module.css';

const EmptyPage = () => {
  
  return (
    <>
      <div className={style['empty-page']}>
        <i className="fa-solid fa-cat fa-10x"></i>
        <h3>What are you looking at?</h3>
        <h3>Say something!</h3>
      </div>
    </>
  );
}

export default EmptyPage;