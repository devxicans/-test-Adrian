import stylesLoading from './loading.module.css'

const LoadingPage = () => {
  return (
    <div className={stylesLoading.loader}>
      <div className={stylesLoading.spinner}></div>
    </div>
  );
};
export default LoadingPage;