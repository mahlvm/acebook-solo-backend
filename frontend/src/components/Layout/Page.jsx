import style from './Page.module.css';

const Page = (props) => {
  return (
    <div className={style['page']}>
      {props.children}
    </div>
  );
};

export default Page;