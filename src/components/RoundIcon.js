import React from 'react'
import classNames from 'classnames'

function RoundIcon({
  icon: Icon,
  iconColorClass = 'text-purple-600 dark:text-purple-100',
  bgColorClass = 'bg-purple-100 dark:bg-purple-600',
  className,
  letter,
  mode
}) {
  const baseStyle = 'p-3 rounded-full'

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className)
  return (
    <div className={cls}>
   {(mode=='subject')? <p className='font-bold text-2xl mx-2 drop-shadow-2xl'>{letter}</p>:
  (mode=='chapter') ? <p className='font-bold text-l mx-2 p-0'>{letter}</p> :<Icon className="w-5 h-5" />  } 
      {/* <Icon className="w-5 h-5" /> */}
    </div>
  )
}

export default RoundIcon
