import React, { useContext, useState,useEffect } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import { UserContext } from '../context/UserContext';
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext,Button } from '@windmill/react-ui'
import { HeartIcon, DownIcon } from '../icons';

import ProfilePhoto from "../assets/img/ProfilePhoto.png";

import { ZoomIn,ZoomOut} from '../icons';

const sectionList=['Main Syllabus','Special Courses','Total Usage'];




function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext);

  const [students,setStudents]=useState(()=>{

    if(localStorage.getItem("students"))
    {
      console.log(localStorage.getItem("students"));
      return JSON.parse(localStorage.getItem('students'));
    }
    else
    {
      return "";
    }

  });


  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [isMainSectionOpen,setIsMainSectionOpen]=useState(false);
  const [isProfileSectionOpen,setIsProfileSectionOpen]=useState(false);
  
  const [sectionName,setSectionName]=useState(sectionList[0]);
  const [currProfile,setcurrProfile]=useState(students[0]);

  const userContext=useContext(UserContext);



  

  userContext.changeSection(sectionName);


  // useEffect(()=>{
  //   userContext.changeSection(sectionName)
  // },[sectionName]);

 

  const routeChange=()=>{
    localStorage.setItem("login",false);
    localStorage.setItem("profile","");
    window.location.reload();
}

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  function toggleDropdown(item) {
    if(item=='section')
    setIsMainSectionOpen(!isMainSectionOpen)
    if(item=='profile')
    setIsProfileSectionOpen(!isProfileSectionOpen)

  }

  useEffect(()=>{

    console.log("Reached profile");
    console.log(userContext.profile)
  },[userContext.profile])

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800" style={{'background':'#924ED6'}}>
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300 ">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-red"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex flex-1 lg:mr-2 ">
          <div className="relative flex-auto w-full  focus-within:text-purple-500 mx-auto">
            <div className="inset-y-0 flex flex-nowrap pl-2">
              {/* <SearchIcon className="w-4 h-4" aria-hidden="true" /> */}
              <div className="relative flex flex-2 mx-auto">
      {/* <Button  onClick={toggleDropdown} aria-label="Notifications" aria-haspopup="true" className='px-auto lg:px-auto mx-auto' iconRight={DownIcon}>
       {sectionName}
      </Button>       */}

      {/* ----Drop down for Syllabus Type */}

      <div className="flex flex-none flex-wrap md:flex-row md:items-end md:space-x-4">
      <div className='relative'>
      <Button  onClick={()=>toggleDropdown("section")} aria-label="Notifications" aria-haspopup="true" className='flex-none mx-6 lg:px-auto text-black'style={{'background': '#D9D7DA'}} iconRight={DownIcon}>
       {sectionName}
      </Button>  
      <Dropdown isOpen={isMainSectionOpen} onClose={() => setIsMainSectionOpen(false)} value={sectionName}>
      {sectionList.map( (v,k)=>(
        <DropdownItem className="justify-between" onClick={e => (setSectionName(e.target.innerText),setIsMainSectionOpen(false))}>
        {v}
        </DropdownItem> 
      ))
      }
      </Dropdown>   
      </div>

      {/* ----Drop down for Syllabus Type */}

      
       <Button  aria-label="Notifications" aria-haspopup="true" className='px-auto mx-4 lg:px-auto text-black'style={{'background': '#D9D7DA'}} >
       {currProfile.medium_name+"-"+currProfile.class_name}
      </Button>   
      
      <Button aria-label="Notifications" aria-haspopup="true" className='px-auto mx-4 lg:px-auto text-black'style={{'background': '#D9D7DA'}} >
       {currProfile.board_name}
      </Button>

      
      
      {/* ----Drop down for Profile Change */}


      <div className='relative'>
       <Button onClick={()=>toggleDropdown("profile")}  aria-label="Notifications" aria-haspopup="true" className='px-auto mx-4 lg:px-auto text-black'style={{'background': '#D9D7DA'}} iconRight={DownIcon}>
       {currProfile.first_name+' '+ currProfile.last_name}
      </Button>
      <Dropdown isOpen={isProfileSectionOpen} onClose={() => setIsProfileSectionOpen(false)} value={currProfile.first_name+' '+currProfile.last_name} className='top-50 right-50'
     >
      {console.log(students)}
      {students && students.map( (v,k)=>(
        <DropdownItem className="justify-between" onClick={e => (setcurrProfile(v),setIsProfileSectionOpen(false),userContext.changeProfile(JSON.stringify(v)))}>
        {v.first_name+' '+v.last_name}
        </DropdownItem> 
      ))
      }
      </Dropdown>
      </div>

      <div>

      <Button layout='outline' icon={ZoomIn} aria-label="Like" className='bg-purple-400 dark:text-purple-600 dark:bg-white'
      onClick={()=>{
        
        if(userContext.marginIndex>=1)
        userContext.changeMarginIndex(userContext.marginIndex-2)
        
        }}></Button>

      </div>  <div>

      <Button layout='outline' icon={ZoomOut} aria-label="Like" className='bg-purple-400 dark:text-purple-600 dark:bg-white'
      onClick={()=>{
        
        if(userContext.marginIndex<=30)
        userContext.changeMarginIndex(userContext.marginIndex+2)
        
        }}></Button>

      </div>

     {/* ----Drop down for Profile Change */}
      </div>
 
    </div>
            </div>     
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-purple-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Messages</span>
                <Badge type="danger">133</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-red focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={ProfilePhoto}
                alt=""
                aria-hidden="true"
              /> 
             
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" onClick={()=>{
                userContext.changeProfile("");
              }}>
                <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Change Profile</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#">
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={routeChange}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;