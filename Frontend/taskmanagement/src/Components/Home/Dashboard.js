import React, { useEffect, useState } from 'react';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { addtask, gettask, removetask,sorttask,updatetask } from '../../Services/services';

function Dashboard() {
  const [tasks, settasks] = useState([]);
  const [stagedata, setstagedata] = useState(["Backlog","To-Do","OnGoing","Done"]);
  const [prioritydata, setprioritydata] = useState(["Low","Medium","High"]);

  useEffect(() => {
    sorttask({email:encryptStorage.getItem("user").email}).then(res=>{
      //console.log(res.data.task)
      settasks(res.data.task)
    })
  }, []);
  

  return <div style={{backgroundImage:`url("../images/background.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",marginTop:"-20px",height:"570px"}}>
    <div >
      <div >
    <h2 style={{marginLeft:"7%",width:"86%"}}>Task</h2>
      <table className="table table-striped table-responsive" style={{marginLeft:"7%",width:"86%"}}>
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
