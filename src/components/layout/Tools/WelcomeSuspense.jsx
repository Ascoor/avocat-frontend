import React from 'react';
import { TailSpin } from 'react-loader-spinner';
const WelcomeSuspense = () => {
  return (
    <div className="custom-loader">
      <div className="loader">
        <TailSpin
          height={40} // Adjust the size as needed
          width={40} // Adjust the size as needed
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
