import React,{useState,useRef} from "react";



const Register=()=>
{
const [user,addUser]=useState({name:"",password:""});
const [message,setMessage]=useState("");
let nameRef=useRef(null);
let passRef=useRef(null);




const handleSubmit=(e)=>
{
e.preventDefault();
let name=nameRef.current.value;
let pass=passRef.current.value;
const newUser={name:name,password:pass};
addUser(newUser);

fetch("http://localhost:3000/src/services/register.php",{
method:"POST",
headers:
{
"Content-Type":'application/json'
},
body:JSON.stringify(newUser)
}).then((response)=>response.json())
.then((data)=>setMessage(data.message))

nameRef.current.value="";
passRef.current.value="";
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
        <input type="submit" className="btn btn-primary my-3" value="Register"/>
    </form>
    </>
)
}
export default Register;