import Footer from '@/components/partial/Footer';
import Privacy from '@/components/partial/Privacy';
import PublicLayout from '@/layout/PublicLayout';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
      <PublicLayout>
        <div className='container flex-grow mx-auto flex mb-5 flex-col gap-5'>
          <h1 className='font-bold text-2xl'>Privacy Notice</h1>
          <Privacy />
        </div>
      </PublicLayout>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
