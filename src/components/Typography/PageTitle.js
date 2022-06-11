import React from 'react'

function PageTitle({ children }) {
  return (
    <h1 className="my-6 text-2xl font-semibold text-white dark:text-gray-200"><span className='p-2 rounded'>{children}</span></h1>
  )
}

export default PageTitle
