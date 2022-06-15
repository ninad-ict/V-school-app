import React,{useState} from 'react'
import { Card, CardBody } from '@windmill/react-ui';

function InfoCard({ title, value, children: icon,handleClick}) {

  const [isActive, setIsActive] = useState(false);

  const handleClickk = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };


  return (
    <Card  className='shadow shadow-2xl'   
    onClick={handleClick}
    
    //   style={{
    //   backgroundColor: isActive ? 'salmon' : '',
    //   color: isActive ? 'white' : '',
    // }}
    // onClick={handleClickk}
     >
      <CardBody className="flex items-center hover:bg-red-400 hover:text-gray-50 ">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
