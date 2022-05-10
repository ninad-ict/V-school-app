import React,{createContext,useState} from "react";

const UserContext=createContext();


function UserProvider(props){

    const [section,setSection]=useState('Main Syllabus');

    function changeSection(val)
    {
        setSection(val);
    }

    const value={
       section: section,
       changeSection: changeSection
    }

 

    
    return(
<UserContext.Provider value={value} >
    {props.children}
</UserContext.Provider>
    )
}

export {UserContext,UserProvider} ;