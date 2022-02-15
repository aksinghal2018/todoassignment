import React, { useEffect, useState } from 'react';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { addtask, gettask, removetask,sorttask,updatetask } from '../../Services/services';

function Dashboard() {
  const [tasks, settasks] = useState([]);
  const [stagedata, setstagedata] = useState(["Backlog","To-Do","OnGoing","Done"]);
  const [prioritydata, setprioritydata] = useState(["Low","Medium","High"]);
  const [taskdata, settaskdata] = useState([])
  const [completetask, setcompletetask] = useState(0)
  const [pendingtask, setpendingtask] = useState(0)
  useEffect(() => {
    if(encryptStorage.getItem("user")==undefined){
      window.location.replace("/")
    }
    
    sorttask({email:encryptStorage.getItem("user").email}).then(res=>{
      //console.log(res.data.task)
      settasks(res.data.task)
      settaskdata(res.data.alltasks)
      var completetask1=0
      var pendingtask1=0
      res.data.alltasks.map(item=>{
        console.log(item.stage)
        if(item.stage==3){
          completetask1=completetask1+1
        }
        else{
          pendingtask1=pendingtask1+1
        }
      })
      setcompletetask(completetask1)
      setpendingtask(pendingtask1)
    })
  }, []);
  

  return <div style={{backgroundImage:`url("../images/background.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",marginTop:"-20px",minHeight:"800px",padding:"20px"}}>
    <div className='container' style={{border:"2px solid black",backgroundColor:"greenyellow"}}>
      <p style={{fontSize:"30px"}}>total tasks : {taskdata.length}</p>
      <p style={{fontSize:"30px"}}>Complete tasks : {completetask}</p>
      <p style={{fontSize:"30px"}}>Pending tasks : {pendingtask}</p>
    </div>
    <div >
      <div >
    <h2 style={{marginLeft:"7%"}}>Task</h2>
      <table className="table table-striped table-responsive" style={{marginLeft:"7%"}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Stage</th>
      <th scope="col">Priority</th>
      <th scope="col">Description</th>
      <th scope="col">Deadline</th>
      <th scope="cop">Creation Date</th>
      </tr>
  </thead>
  <tbody>
    {
      tasks.map((item,index)=>{
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{stagedata[item.stage]}</td>
              <td>{prioritydata[item.priority]}</td>
              <td>{item.description}</td>
              <td>{item.deadline}</td>
              <td>{item.creation_date}</td>
              </tr>
          )
      
      })
    }
    
  </tbody>
</table>
      </div>
          </div>
  </div>;
}

export default Dashboard;
