import clsx from 'clsx'
import React from 'react'

const Card = ({ className, children, ...props}: { className?: string, children: any }) => (
  <div className={clsx(className, "bg-white p-6 rounded-none lg:rounded-lg")} {...props}>
    {children}
  </div>
)

export default Card