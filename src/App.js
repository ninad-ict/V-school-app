import React, { lazy, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { useState } from 'react';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const Profile = lazy(() => import('./pages/Profile'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Home = lazy(() => import('./pages/Home'))

function App() {



  console.log("local->"+localStorage.getItem('login'));
    
  const [profileSelect,setProfileSelect]=useState(()=>{
    if(localStorage.getItem('profile'))
    {
      console.log("Profile is selected");
      return localStorage.getItem('profile');
    }
    else
    {
      console.log("profile is not selected");
      return "";
    }
    });

    console.log("profile->"+localStorage.getItem('profile'));

  const [login,setLogin]=useState(()=>{
    if(localStorage.getItem('login')&&localStorage.getItem("login")==="true")
    {
      console.log("Login is true");
      return true;
    }
    else
    {
      console.log("Login is false");
      setProfileSelect("");
      return false;
    }
    });


  return (
    <>
    {console.log("Profile is "+profileSelect)}
    {/* /V-school-app */}
      <Router basename="/V-school-app">
        <AccessibleNavigationAnnouncer />
       
          {
            (!login)?
            <Switch> 
            <Route exact path="/" render={()=><Login checkLogin={setLogin}/>} />
            <Route path="/login" render={()=><Login checkLogin={setLogin}/>}  />
            <Redirect from="*" to="/" />
            </Switch>
            
            :

              (!profileSelect)? 
            <Switch>
            <Route exact path="/profile" render={()=><Profile checkProfile={setProfileSelect}/>} />
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
