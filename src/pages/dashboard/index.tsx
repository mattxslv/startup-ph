'use client';
import Home from '@/feature/home/Home';
import withAuth from '@/hoc/withAuth';
import HomeLayout from '@/layout/HomeLayout';
import React from 'react';

type Props = {};

function DashboardPage({}: Props) {
  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
}

export default withAuth(DashboardPage);
