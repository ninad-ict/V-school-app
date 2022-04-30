import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { useState } from 'react';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const Profile = lazy(() => import('./pages/Profile'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {

  console.log("local->"+localStorage.getItem('login'));

  const [login,setLogin]=useState(()=>{
    if(localStorage.getItem('login')&&localStorage.getItem("login")==="true")
    {
      console.log("Login is true");
      return true;
    }
    else
    {
      console.log("Login is false");
      return false;

    }
    });

  const [profileSelect,setProfileSelect]=useState(false);

  // const [login,setLogin]=useState(false);


    // if(!login)
    // {
    //     return (
    //     <>
    //      <BrowserRouter basename="/fasli">
      
  
    //      <Switch>
    //     <Route exact path="/" render={()=><Login checkLogin={setLogin}/>} />;
    //     <Redirect from="*" to="/" />
    //     </Switch>
    //     </BrowserRouter>
    //         {/* <div className="md:ml-64">
            
    //         </div>  */}
    //     </>
    //     )
    // }


  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
       
          {
            (!login)?
            <Switch> 
            <Route exact path="/" render={()=><Login checkLogin={setLogin}/>} />
            <Route path="/login" render={()=><Login checkLogin={setLogin}/>}  />
            <Redirect exact from="/" render={()=><Login checkLogin={setLogin}/>} />
            <Redirect from="*" render={()=><Login checkLogin={setLogin}/>} />
            </Switch>
            
            :

              (!profileSelect)? 
            <Switch>
            <Route exact path="/profile" render={()=><Profile checkProfile={profileSelect}/>} />
            <Redirect from="*" to="/profile" />
            </Switch>
            :
            <Switch>
            <Route path="/app" component={Layout} />
            {/* <Route path="/profile" component={Profile} /> */}
            {/* <Redirect exact from="/" component={Layout} /> */}
            <Redirect exact from="/" to="/app/dashboard" />
            <Redirect exact from="/" to="/app/dashboard" />
            <Redirect from="*" to='/app/dashboard'/>
          </Switch>
            
          }
          
       
      </Router>
    </>
  )
}

export default App
