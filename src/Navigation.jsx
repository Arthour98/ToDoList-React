import { Outlet,NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./custom-hooks/CrudContext";


export function NAV(){
   const {user,loggedOut}=useAuth();

    const navigate=useNavigate();

    const handleLogout=(e)=>
    {
        e.preventDefault();
        loggedOut();
        navigate("/login")
    }



    return(
        <>
        <nav className="d-flex justify-content-center gap-5 py-5 bg-primary">

            <NavLink to="/"className={({isActive})=>
                isActive?"text-success fs-3 text-decoration-none":"text-light fs-3 text-decoration-none"
            }>TaskManager</NavLink>
            
            <NavLink to="/register"className={({isActive})=>
            
                isActive?"text-success fs-3 text-decoration-none":"text-light fs-3 text-decoration-none"
            }>Register</NavLink>
            

           
            <NavLink to="/login"className={({isActive})=>
                isActive?"text-success fs-3 text-decoration-none":"text-light fs-3 text-decoration-none"
            }>Login</NavLink>
            

            
            <NavLink to="/logout"className={({isActive})=>
            isActive?"text-success fs-3 text-decoration-none":"text-light fs-3 text-decoration-none"
            } onClick={handleLogout}>Logout</NavLink>
            

        </nav>
        <Outlet/>
        </>

    )
}