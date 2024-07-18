// frontend/app/layout.tsx
"use client"
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/globals.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-gray-100 text-gray-800">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
