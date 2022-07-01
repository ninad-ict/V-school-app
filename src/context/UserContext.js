import React,{createContext,useState} from "react";
import Login from "../pages/Login";

const UserContext=createContext();


function UserProvider(props){

    const [section,setSection]=useState('Main Syllabus');

    const [profile,setProfile]=useState(()=>{


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

    const [marginIndex,setMarginIndex]=useState(10);

    const [login,setLogin]=useState(()=>{
        if(localStorage.getItem('login')&&localStorage.getItem("login")==="true")
        {
          console.log("Login is true");
          return true;
        }
        else
        {
          console.log("Login is false");
          setProfile("");
          return false;
        }
        });

  

    function changeSection(val)
    {
        setSection(val);
    }

    function changeLogin(val)
    {
        setLogin(val);

        if (val==true)
        {
            localStorage.setItem("login",true);
        }
        else
        {
            localStorage.setItem("login",false);
        }
    }

    function changeProfile(val)
    {
        setProfile(val);

        if(val)
        {
            localStorage.setItem("profile",val);
        }

        
    }

    function changeMarginIndex(index)
    {
        setMarginIndex(index)
    }

    const value={
       section: section,
       changeSection: changeSection,
       login:login,
       changeLogin:changeLogin,
       profile:profile,
       changeProfile:changeProfile,
       marginIndex:marginIndex,
       changeMarginIndex:changeMarginIndex
    }

 

    
    return(
<UserContext.Provider value={value} >
    {props.children}
</UserContext.Provider>
    )
}

export {UserContext,UserProvider} ;