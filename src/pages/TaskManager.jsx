import React,{useState,useRef,useEffect} from "react";
import { useAuth } from "../custom-hooks/CrudContext";



const TaskManager=()=>
{
    const {user}=useAuth();
    const [tasks,setTasks]=useState([]);
    
    let taskRef=useRef(null);

    useEffect(()=>
    {
    fetch("http://localhost:3000/src/services/getTasks.php")
    .then(response=>{return response.json()})
    .then((data)=>
    {
    setTasks(data);
    })
    },[tasks]);


    const addTask=(e)=>
    {
        e.preventDefault();

        let taskName=taskRef.current.value;
        let user_id=user["user_id"];

        const newTask=
        {
        user_id:user_id,
        task_name:taskName
        }

        fetch("http://localhost:3000/src/services/addTask.php",
        {
        method:"POST",
        header:
        {
        "Content-Type":"applicaton/json"
        },
        body:JSON.stringify(newTask)
        }).then(response=>{return response.json()})
        .then((data)=>
        {
        setTasks([...tasks,data]);
        })
        taskRef.current.value="";
        
    }
      
    return(
        <>
        <div class="container-fluid">
        <div class="row gap-5 justify-content-center">
            <div class="col-12 d-flex justify-content-center">
        <form className="form-control mt-3 p-5 w-50" onSubmit={addTask}>
            <label className="form-label">
                Set your task :
            </label>
            <input type="text" className="form-control" ref={taskRef}/>
            <input type="submit" value="Add" className="btn btn-primary rounded-3 mt-2 px-4"/>
        </form>
        </div>
            <div class="col-6 d-flex  border border-1 border-dark">
                <ul>
                    {tasks.map(task=>
                        {
                            <li key={task["task_id"]}>{task["task_name"]}<input type="checkbox"/></li>
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