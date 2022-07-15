import React, { lazy, useRef,useContext,useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { useState } from 'react';
import { UserContext } from './context/UserContext';
// import ReactGA from 'react-ga';
// const TRACKING_ID = "G-DZYH7BD5EX"; // OUR_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);
import {sendWebTimeSpend} from "./dataFromServer";

import { useStopwatch } from "react-use-stopwatch";

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const Profile = lazy(() => import('./pages/Profile'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Home = lazy(() => import('./pages/Home'));





function App() {

  const pageHeading=useContext(UserContext);
  // console.log("Total Time of visit"+localStorage.getItem("timeOfVisit"))

  const [{ time, format }, start, stop, reset] = useStopwatch();
  start();

  useEffect(() => {

    // start();


    const handleTabClose = event => {
      event.preventDefault();

      // stop();
      console.log('beforeunload event triggered');
      console.log('Time Elapsed'+time);



    //   sendWebTimeSpend(sessiontime).then(d=>{
    //   setAllSubjects(d.response);
    //   console.log(d.response[0].subject_name)
    // })
    // .catch(e=>console.log("Error"+e));


      // localStorage.setItem("")
      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);


  console.log("local->"+localStorage.getItem('login'));
    
  // const [profileSelect,setProfileSelect]=useState(()=>{
  //   if(localStorage.getItem('profile'))
  //   {
  //     console.log("Profile is selected");
  //     return localStorage.getItem('profile');
  //   }
  //   else
  //   {
  //     console.log("profile is not selected");
  //     return "";
  //   }
  //   });

  //   console.log("profile->"+localStorage.getItem('profile'));

  // const [login,setLogin]=useState(()=>{
  //   if(localStorage.getItem('login')&&localStorage.getItem("login")==="true")
  //   {
  //     console.log("Login is true");
  //     return true;
  //   }
  //   else
  //   {
  //     console.log("Login is false");
  //     setProfileSelect("");
  //     return false;
  //   }
  //   });


  return (
    <>
    {console.log("Profile is "+pageHeading.profile)}
    {/* /V-school-app */}
      <Router basename="/V-school-app"  className="GeeksForGeeks">
        <AccessibleNavigationAnnouncer />
       
          {
            (!pageHeading.login)?
            <Switch> 
            <Route exact path="/" render={()=><Login/>} />
            <Route path="/login" render={()=><Login/>}  />
            <Redirect from="*" to="/" />
            </Switch>
            
            :

              (!pageHeading.profile)? 
            <Switch>
            <Route exact path="/profile" render={()=><Profile/>} />
            <Redirect from="*" to="/profile" />
            </Switch>
            :
            <Switch>
            {/* <Route path='/subject/:subject' component={Home} ></Route>  */}
            {/* <Route path="/app/Home/:subject" component={Layout} /> */}
            <Route path="/app" component={Layout} />
            <Route path="/app/Home" component={Home} />
            {/* <Route path="/profile" component={Profile} /> */}
            {/* <Redirect exact from="/" component={Layout} /> */}
            <Redirect exact from="/" to="/app/Home" />
            <Redirect exact from="/" to="/app/Home" />
            <Redirect from="*" to='/app/Home'/>
          </Switch>
            
          }
          
       
      </Router>
    </>
  )
}

export default App
