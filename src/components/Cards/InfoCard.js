import React,{useState} from 'react'
import { Card, CardBody } from '@windmill/react-ui';
import { NavLink,Switch,Route, BrowserRouter } from 'react-router-dom';

function InfoCard({ title, value, children: icon,handleClick,color}) {

  const [isActive, setIsActive] = useState(false);

  const handleClickk = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };


  return (
    <>
    {console.log(`Link->/app/Home/subject/${title}`)}
    {/* <NavLink to={`/app/Home/${title}`} activeClassName='bg-red-400'> */}
    
    <Card  className={`shadow shadow-md ${color}`}
    onClick={handleClick}
    
    //   style={{
    //   backgroundColor: isActive ? 'salmon' : '',
    //   color: isActive ? 'white' : '',
    // }}
    // onClick={handleClickk}
     >
     {/* <NavLink  exact className='bg-red-400' activeClassName='bg-red-400' to={`/app/Home/subject/${title}`}  > */}
      <CardBody className="flex items-center hover:bg-purple-400 hover:text-gray-50">
        {icon}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
        </div>
        
      </CardBody>
      {/* </NavLink> */}
    </Card>
   
    {/* <Switch>
    <Route path="/app/Home/:subject" component/>
    </Switch> */}
</>
  )
}

export default InfoCard
