import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/SchoolChildren.jpeg'
import ImageDark from '../assets/img/SchoolChildren.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button,HelperText } from '@windmill/react-ui'
import {RightIcon} from "../icons";
// import {HeartIcon} from "../icons";
import {useState} from "react";
import { SmileIcon } from '../icons';
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon';
import { fa } from 'faker/lib/locales'

function Profile(props) {

  const student=['Ninad Khanolkar','Amol Khanolkar','Vivek Sinha','Rahul Nair'];

  const [profileName,setProfileName]=useState("");

  const handlecheckProfile=props.checkProfile;


  function handleProfileClick(v)
  {
    console.log("Click");
    handlecheckProfile(true);
    localStorage.setItem("profile",v)
  }


  useEffect(()=>{
    if(profileName)
    {
      handlecheckProfile(true);
      localStorage.setItem("profile",profileName)
    }
  },[profileName]);





  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 ">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Who is Studying?</h1>
                          <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-12/12 pr-4 font-light">
              <Label>
              <span>Select Profile</span>
              </Label></div></div>           
        <div className="flex flex-wrap mt-10">
  {/* <Image src= */}
  {
    student.map((v,k)=>(
      <div className="w-full lg:w-12/12 pr-4 font-light">

  {/* <Image src= */}
  <InfoCard title="Student" value={v} handleClick={e=>setProfileName(v)}>
          <RoundIcon
            icon={SmileIcon}
            className="mr-4 hover:bg-sky-200"
          />
        </InfoCard>
</div>
    ))
  }
              
    
     
            </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile
