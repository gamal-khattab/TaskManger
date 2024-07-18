// frontend/app/pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import  store  from '../redux/store'; // Assuming your Redux store is configured

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
