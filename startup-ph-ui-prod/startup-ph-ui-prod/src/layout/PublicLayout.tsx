import CommonHead from '@/components/partial/CommonHead'
import HomeHeader from '@/components/partial/HomeHeader'
import React from 'react'

function PublicLayout({ children, withHead = true, withNav = true }: {
  children: any,
  withHead?: boolean,
  withNav?: boolean
}) {
  return (
    <>
      {withHead ? <CommonHead /> : null}
      {withNav ? <div className="pt-7 mb-12 relative z-10">
        <HomeHeader />
      </div> : null}
      {children}
    </>
  )
}

export default PublicLayout