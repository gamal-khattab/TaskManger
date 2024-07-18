// frontend/app/pages/register.tsx

import React from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../components/Auth/Register';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
