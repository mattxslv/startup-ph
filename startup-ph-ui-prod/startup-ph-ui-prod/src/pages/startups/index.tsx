import Startups from '@/feature/startups';
import HomeLayout from '@/layout/HomeLayout';
import React from 'react';

type Props = {};

function StartUpsPage({}: Props) {
  return (
    <HomeLayout>
      <Startups />
    </HomeLayout>
  );
}

export default StartUpsPage;
