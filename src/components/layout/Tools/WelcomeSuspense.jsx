import React from 'react';
import { TailSpin } from 'react-loader-spinner';
const WelcomeSuspense = () => {
  return (
    <div className="custom-loader" style={{ marginLeft: '60px' }}>
      <div className="loader">
        <TailSpin
          height={40} // تعديل الحجم حسب الحاجة
          width={40} // تعديل الحجم حسب الحاجة
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
