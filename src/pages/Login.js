import React,{useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/SchoolChildren.jpeg'
import ImageDark from '../assets/img/SchoolChildren.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button,HelperText } from '@windmill/react-ui'
import {RightIcon} from "../icons";
// import {HeartIcon} from "../icons";
import {useState} from "react";
import { fa } from 'faker/lib/locales';

import { UserContext } from '../context/UserContext';

import {startAuth,verifyOTP,getStudentList} from "../dataFromServer";
import { combineReducers } from 'redux'

// import {login, startAuth} from '../redux/actions';


function Login() {
  const [number,setNumber]=useState("");
  const [otp,setOtp]=useState("");
  const [password,setPassword]=useState("");
  const [numberMode,setNumberMode]=useState(true);
  const [profileDetails,setProfileDetails]=useState("");

  // const handlecheckLogin=props.checkLogin;

  const userContext=useContext(UserContext);

  function handleSubmitPhone()
  {

    console.log("Before numberMode condition");

    if(numberMode)
     {

      console.log("ABout to enter startAuth");
       startAuth(number,false,null);
       setNumberMode(false);

       return;
     }
     console.log("ABout to enter verifyOTP");

    //  verifyOTP(number,otp).then(d=>console.log(d));
    //  const result= await verifyOTP(number,otp);

    //  console.log(result);
    //  if(result && result!='FAIL')
    //  {
    //   // handlecheckLogin(true);
    //   console.log("OTP is verified and token is sent");
    //   userContext.changeLogin(true);
    //   localStorage.setItem("login",true);
    //  }

      // setProfileDetails(verifyOTP(number,otp).then(d=>console.log(d)));
      // console.log(verifyOTP(number,otp));

      const values=verifyOTP(number,otp);

      values.then(d=>{console.log("The magic word is"+d);setProfileDetails(d)});


      setProfileDetails(values);

      // console.log(values.then(d=>console.log("The returned value is "+d)));

    // const getDetails=verifyOTP(number,otp);

    // getDetails.then(d=>console.log("D is ->"+d));


    // verifyOTP(number,otp).then(d=>console.log("D is ->"+d));
  }

  useEffect(()=>{
    console.log("profile details entered with value"+profileDetails);


    if(profileDetails=="SUCCESS")
    {
      
      console.log("OTP is verified and token is sent");
      userContext.changeLogin(true);
      localStorage.setItem("login",true);
      //getStudentList();
    }

  },[profileDetails]);





  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
            {
              (numberMode) ? 
              <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-12/12 pr-4 font-light">
              <Label>
              <span>Enter Your Contact Number</span>
            
              <Input className="mt-1" type="text"
                placeholder="" value={number} 
              onChange={e=>setNumber(e.target.value)}
              />
              {(/^[6-9]\d{9}$/.test(number)&&number) ? "":<HelperText valid={false}>Provide a valid Contact Number</HelperText>}
            </Label>
            {/* {if (number!=10)} <p className='text-red-600 text-xs'>Enter Correct Number</p> */}
            </div>    
          </div>
          :
          <div className="flex flex-wrap mt-10">
          <div className="w-full lg:w-12/12 pr-4 font-light">
              <Label>
              <span>Enter OTP</span>
            
              <Input className="mt-1" type="password"
                placeholder="" value={otp} 
              onChange={e=>setOtp(e.target.value)}
              />
              {/* {(!number||number.length==10) ? "":<HelperText valid={false}>Provide a valid Contact Number</HelperText>} */}
            </Label>
            {/* {if (number!=10)} <p className='text-red-600 text-xs'>Enter Correct Number</p> */}
            </div>    
          </div>
          
          }
              <Button className="mt-4" block
              disabled={((numberMode&&!/^[6-9]\d{9}$/.test(number))||(!numberMode&&otp.length<4)) ? true:false} onClick={handleSubmitPhone}>
                {(numberMode) ? "Send OTP":"Login"}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
