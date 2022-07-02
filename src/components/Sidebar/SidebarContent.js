import React,{useContext} from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui';
import { UserContext } from '../../context/UserContext';
import Logo from "../../assets/img/VopaSideBar.png";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function handleLogout()
{
  localStorage.setItem("login",false);
    localStorage.setItem("profile","");
    window.location.reload();
}

const newClass="";

function SidebarContent() {
  const userContext=useContext(UserContext);
  const profile=JSON.parse(userContext.profile);
  return (
    <div className="py-1 text-gray-50  dark:text-gray-400 items-center sidebar-design h-screen w-auto" 
    // style={{'background':'linear-gradient(180deg, #924ED6 33.87%, rgba(36, 121, 221, 0.82) 131.56%)'}}
    >
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        <img src={Logo} width='25%' className='ml-6'/>
      </a>
      <hr className='mt-3 mx-4'/>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <>
                      
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${(route.name=='Logout')? "text-purple-400":""}`}
                activeClassName="text-gray-800 dark:text-gray-100"
                onClick={(route.name=='Logout')? handleLogout:""}
              >
                <Route path={route.path} exact={route.exact} >
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
            
            </>
          )
        )}
      </ul>
      
      {/* <div className="px-2 my-6 mx-4 border-t border-b rounded text-sm dark:text-white py-4">

      <p className='font-bold'>Welcome ,{profile.first_name} {profile.last_name}! </p>
      <br/>
      <p><strong>Class: </strong> {profile.class_name} </p>
      <p><strong>Board: </strong>{profile.board_name}  </p>
      <p><strong>Medium:</strong>{profile.medium_name}  </p>
      <p><strong>School:</strong>{profile.school_name} </p>

        <Button className='hidden'>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default SidebarContent
