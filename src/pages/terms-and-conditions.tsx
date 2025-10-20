import Footer from '@/components/partial/Footer';
import Terms from '@/components/partial/Terms';
import PublicLayout from '@/layout/PublicLayout';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <>
      <PublicLayout>
        <div className='container flex-grow mx-auto flex mb-5 flex-col gap-5'>
          <h1 className='font-bold text-2xl'>Terms and Conditions</h1>
          <Terms />
        </div>
      </PublicLayout>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
