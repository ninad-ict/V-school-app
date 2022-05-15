import React, { lazy, useRef,useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { useState } from 'react';
import { UserContext } from './context/UserContext';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const Profile = lazy(() => import('./pages/Profile'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Home = lazy(() => import('./pages/Home'))

function App() {

  const pageHeading=useContext(UserContext);


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
      <Router basename="/V-school-app">
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
