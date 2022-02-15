import React, { useEffect, useState } from 'react';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { addtask, gettask, removetask,updatetask } from '../../Services/services';
import AppDragDropDemo from './Dragdrop/AppDragDropDemo';
import './table.css'

function TaskManagement() {
  const [name, setname] = useState("");
  const [stage, setstage] = useState("");
  const [priority, setpriority] = useState("");
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState("");
  const [tasks, settasks] = useState([]);
  const [btnstatus, setbtnstatus] = useState(0);
  const [btn, setbtn] = useState(<button type="submit" className="btn btn-primary">Add Task</button>);
  const [stagedata, setstagedata] = useState(["Backlog","To-Do","OnGoing","Done"]);
  const [prioritydata, setprioritydata] = useState(["Low","Medium","High"]);
  useEffect(() => {
    //console.log(encryptStorage.getItem("user"))
    if (encryptStorage.getItem("user") == "undefined") {
      window.location.replace('/')
    }
    else{
      gettask({email:encryptStorage.getItem("user").email}).then(res=>{
        //console.log(res.data.task)
        settasks(res.data.task)
      })
    }
  }, []);
  const deletetask=(index)=>{
    removetask({email:encryptStorage.getItem("user").email,index:index}).then(data=>{
      console.log(data)
      if(data.data.Status="true"){
        window.location.reload("/")
      }
    })
  }
  const updatebtn=(index)=>{
    console.log(index)
    console.log(tasks)
    setbtn(<button type="button" className="btn btn-warning" onClick={()=>updatetasks(index)}>Update Task</button>)
    document.getElementById("name").value=tasks[index].name
    setname(tasks[index].name)
    document.getElementById("stage").value=tasks[index].stage
    setstage(tasks[index].stage)
    document.getElementById("priority").value=tasks[index].priority
    setpriority(tasks[index].priority)
    document.getElementById("description").value=tasks[index].description
    setdescription(tasks[index].description)
    document.getElementById("deadline").value=tasks[index].deadline
    setdeadline(tasks[index].deadline)
    
  }
  const updatetasks=(index)=>{
    const data = { name: document.getElementById("name").value, stage: document.getElementById("stage").value, priority: document.getElementById("priority").value, description: document.getElementById("description").value, deadline: document.getElementById("deadline").value, email: encryptStorage.getItem("user").email,creation_date:new Date().toISOString().slice(0, 10) }
    console.log(data)
    const data111=({email:encryptStorage.getItem("user").email,index:index,task:data})
     updatetask(data111).then(data=>{
       console.log(data)
       if(data.data.Status="true"){
         window.location.reload("/")
       }
     })
  }
  const forwardbtn=(index)=>{
    var task=tasks[index]
    task.stage=(parseInt(task.stage)+1).toString()
    const data = { name: document.getElementById("name").value, stage: document.getElementById("stage").value, priority: document.getElementById("priority").value, description: document.getElementById("description").value, deadline: document.getElementById("deadline").value, email: encryptStorage.getItem("user").email }
    console.log(data)
    const data111=({email:encryptStorage.getItem("user").email,index:index,task:task})
     updatetask(data111).then(data=>{
       console.log(data)
       if(data.data.Status="true"){
         window.location.reload("/")
       }
     })
  }
  const backwardbtn=(index)=>{
    var task=tasks[index]
    if(parseInt(task.stage)>0){

      task.stage=(parseInt(task.stage)-1).toString()
      const data = { name: document.getElementById("name").value, stage: document.getElementById("stage").value, priority: document.getElementById("priority").value, description: document.getElementById("description").value, deadline: document.getElementById("deadline").value, email: encryptStorage.getItem("user").email }
      console.log(data)
      const data111=({email:encryptStorage.getItem("user").email,index:index,task:task})
       updatetask(data111).then(data=>{
         console.log(data)
         if(data.data.Status="true"){
           window.location.reload("/")
         }
       })
    }
  }
  const submithandler = (e) => {
    e.preventDefault()
    if(name=="" || stage=="" || priority=="" || description=="" || deadline==""){
      alert("Feilds cannot be empty !!")
    }
    else{

      const datedata=new Date().toISOString().slice(0, 10)
      console.log(datedata)
      const data = { name: name, stage: stage, priority: priority, description: description, deadline: deadline, email: encryptStorage.getItem("user").email,creation_date:new Date().toISOString().slice(0, 10) }
      console.log(data)
      addtask(data).then(res=>{
        if(res.data.Status=="true"){
          var data11=encryptStorage.getItem("user")
          data11.tasks.push(data)
          encryptStorage.setItem("user",data11)
          alert(res.data.message)
          window.location.reload("")
        }
      })
    }
  }
  const handler = (e) => {
    const id = e.target.id;
    //console.log(e.target.value)
    if (id == "name") {
      setname(e.target.value)
    }
    if (id == "priority") {
      setpriority(e.target.value)
    }
    if (id == "stage") {
      setstage(e.target.value)
    }
    if (id == "description") {
      setdescription(e.target.value)
    }
    else {
      setdeadline(e.target.value)
    }
  }

  return <div style={{marginTop:"-40px",padding:"40px",backgroundImage:`url("../images/background.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
    <div >
    <div  >
        <form style={{ marginLeft: "15%", width: "70%", border: "2px solid black", padding: "20px", marginTop: "40px", marginBottom: "20px" }} onSubmit={submithandler}>
          <h2>Add Task</h2>
          <div className="form-group">
            <label htmlFor="name"> name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={handler} />
          </div>
          <div className="form-group">
            <label htmlFor="stage">Stage</label>
            <select className="form-select" aria-label="Default select example" id="stage" onChange={handler} style={{width:"100%",height:"42px"}} defaultValue={'DEFAULT'}>
              <option value="DEFAULT">Stage</option>
              <option value="0">Backlog </option>
              <option value="1">To-Do</option>
              <option value="2">Ongoing </option>
              <option value="3">Done </option>
            </select>
             </div>
          <div className="form-group">
            <label htmlFor="priority">priority</label>
            <select className="form-select" aria-label="Default select example" id="priority" onChange={handler} style={{width:"100%",height:"42px"}} defaultValue={'DEFAULT'}>
              <option value="DEFAULT">Priority</option>
              <option value="0">Low </option>
              <option value="1">Medium</option>
              <option value="2">High </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <input type="text" className="form-control" id="description" placeholder="description" onChange={handler} />
          </div>
          <div className="form-group">
            <label htmlFor="deadline"> Deadline</label>
            <input type="date" className="form-control" id="deadline" placeholder="deadline" onChange={handler} />
          </div>
          {btn}
        </form>

      </div>
      <div  >
    <h2 style={{marginTop:"40px",marginLeft:"20px"}}>Task</h2>
      <AppDragDropDemo updatebtn={updatebtn} deletetask={deletetask}/>
      </div>
     
    </div>
  </div>;
}

export default TaskManagement;
