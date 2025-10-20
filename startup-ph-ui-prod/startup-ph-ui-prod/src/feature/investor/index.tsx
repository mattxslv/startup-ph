import Card from '@/components/partial/Card';
import React from 'react'
import NoInvestorProfile from './NoInvestorProfile';

type Props = {}

function Investor({}: Props) {
  const hasInvestmentProfile = false;
  if (!hasInvestmentProfile) {
    return (
      <NoInvestorProfile />
    )
  }
  return (
    <Card>
      Investor Details here
    </Card>
  )
}

export default Investor