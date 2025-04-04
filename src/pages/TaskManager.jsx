import React,{useState,useRef,useEffect} from "react";
import { useAuth } from "../custom-hooks/CrudContext";



const TaskManager=()=>
{
   
    const {user}=useAuth();
    const [tasks,setTasks]=useState([]);
    const [message,setMessage]=useState("");
    let taskRef=useRef(null);
    
    useEffect(()=>
    {
        setTimeout(()=>
        {
        setMessage("")
        },4000)
    },[tasks])

    useEffect(()=>
    {
    const user_id={user_id:user["user_id"]};
    console.log(user_id);
    fetch("http://localhost:3000/src/services/getTasks.php",
        {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json"
        },
        body:JSON.stringify(user_id)
        }
    )
    .then((response)=>response.json())
    .then((data)=>
    {
    setTasks(data.reverse());
    })
    },[user]);


    const addTask=(e)=>
    {
        e.preventDefault();

        let taskName=taskRef.current.value;
        let user_id=user["user_id"];

        const newTask=
        {
        user_id:user_id,
        task_name:taskName,
        status:"ongoing"
        }

        fetch("http://localhost:3000/src/services/addTask.php",
        {
        method:"POST",
        headers:
        {
        "Content-Type":"application/json"
        },
        body:JSON.stringify(newTask)
        }).then((response)=>response.json())
        .then((data)=>
        {
        setTasks([newTask,...tasks]);
        setMessage(data["message"])
        })
        taskRef.current.value="";
        
    }
    
    const check=(e)=>
    {
        let task_id=Number(e.target.value);
        let status=e.target.checked?"completed":"ongoing";
        const checkbox={task_id:task_id,status:status}

        setTasks(updatedTask=>updatedTask.map(task=>task["task_id"]===task_id?{...task,status:status}:task))
        fetch("http://localhost:3000/src/services/checkStatus.php",
            {
            method:"POST",
            headers:
            {
            "Content-Type":"application/json"
            },
            body:JSON.stringify(checkbox)
            }
        ).then(response=>response.json())
        .then((data)=>
        {
        setMessage(data["message"]);
        }
        )
    }
      
    return(
        <>
        {user&&<h1 className="position-absolute">Somehow connected</h1>}
        {message&& <div className="alert alert-success alert-dismissible fade show position-absolute w-100 text-center"
     role="alert">
        <button type="button" className="btn-close"
         onClick={()=>setMessage("")}></button>
         {message}
        </div>}

        <div className="container-fluid">
        <div className="row gap-5 justify-content-center">
            <div className="col-12 d-flex justify-content-center">
        <form className="form-control mt-3 p-5 w-50" onSubmit={addTask}>
            <label className="form-label">
                Set your task :
            </label>
            <input type="text" className="form-control" ref={taskRef}/>
            <input type="submit" value="Add" className="btn btn-primary rounded-3 mt-2 px-4"/>
        </form>
        </div>
            <div className="col-6 d-flex"style={{height:"50rem",overflowY: "scroll",scrollbarWidth:"none"}}>
                <ul className="d-flex flex-column row-gap-10 w-100 p-0">
                    {tasks.map(task=>
                        {
                           return  <li className={task["status"]==="completed"?
                            "fs-2 d-flex border border-1 border-success py-3 text-light rounded-5  opacity-25"
                            :"fs-2 d-flex border border-1 border-danger py-3 text-light rounded-5 "}
                           key={task["task_id"]}>
                                <div className={task["status"]==="completed"?"flex-50 text-break px-3  text-decoration-line-through"
                                :"flex-50 text-break px-3"}>{task["task_name"]}</div>
                            <div className="flex-50 d-flex gap-3  px-3">
                            <input type="checkbox"  value={task["task_id"]} className="form-check-input cursor-pointer"
                            onChange={check} checked={task.status==="completed"} /><p className="ml-3">{task.status}</p></div></li>
                        }
                    )}
                </ul>
            </div>
        </div>
        </div>
        </>
    )
}
export default TaskManager;