import { TailSpin } from 'react-loader-spinner';
const WelcomeSuspense = () => {
  return (
    <div className="custom-loader" style={{ marginLeft: '60px' }}>
      <div className="loader">
        <TailSpin
          height={75} // تعديل الحجم حسب الحاجة
          width={75} // تعديل الحجم حسب الحاجة
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default WelcomeSuspense;
