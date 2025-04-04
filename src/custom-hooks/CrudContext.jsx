
import React,{useState,useEffect,useContext,createContext} from "react";



const CrudContext=createContext();

export const CrudProvider=({children})=>
{
const [user,setUser]=useState((user)=>
{
return user?JSON.parse(localStorage.getItem("user")):[];
});


useEffect((currentUser)=>
{
currentUser=JSON.parse(localStorage.getItem("user"));
setUser(currentUser);
},[])

const logged=(userId,userName)=>
{
const currentUser={user_id:userId,user_name:userName};
localStorage.setItem("user",JSON.stringify(currentUser));
}

const loggedOut=()=>
{
localStorage.clear();
}



return(
    <CrudContext.Provider value={{user,logged,loggedOut}}>
        {children}
    </CrudContext.Provider>
)


}

export const useAuth=()=>
{
return useContext(CrudContext);
}

