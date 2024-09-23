import stylesLoading from './loading.module.css'

const LoadingPage = ({isActive = false}) => {
  return (
    <div className={ isActive ? stylesLoading.loaderActive : stylesLoading.loader}>
      <div className={isActive ? stylesLoading.spinnerActive : stylesLoading.spinner}></div>
    s
    </div>
  );
};
export default LoadingPage;