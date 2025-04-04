import React,{useRef,useState} from "react";
import { useAuth } from "../custom-hooks/CrudContext";
import { useNavigate } from "react-router-dom";
const Login=()=>
{
const {user,logged}=useAuth();
const [message,setMessage]=useState("");

let nameRef=useRef(null);
let passRef=useRef(null);
const navigate=useNavigate();



const handleSubmit=(e)=>
{
e.preventDefault();
let name=nameRef.current.value;
let pass=passRef.current.value;
const checkUser={name:name,password:pass};

fetch("http://localhost:3000/src/services/login.php",{
method:"POST",
headers:
{
"Content-Type":'application/json'
},
body:JSON.stringify(checkUser)
}).then((response)=>response.json())
.then((data)=>
    {
    setMessage(data.message);
    logged(data["user_id"],data["user_name"]);
    })
    
nameRef.current.value="";
passRef.current.value="";
if(user)
{
navigate('/') 
}
}

return(
    <>
    {message&& <div className="alert alert-success alert-dismissible fade show"
     role="alert">
        <button type="button" className="btn-close"
         onClick={()=>setMessage("")}></button>
         {message}
        </div>}
    <form className="w-50 p-5 mt-5  position-relative start-50 top-50 translate-middle-x
    shadow p-3 mb-5 bg-body-tertiary rounded " onSubmit={handleSubmit}>
        <label className="form-label">
            Username:
        </label>
        <input type="text" ref={nameRef} className="form-control" placeholder="Username" />
        <label className="form-label">
            Password:
        </label>
        <input type="password" ref={passRef} className="form-control" placeholder="********" />
        <input type="submit" className="btn btn-primary my-3" value="login"/>
    </form>
    </>
)
}
export default Login;