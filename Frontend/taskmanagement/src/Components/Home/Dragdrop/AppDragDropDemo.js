

import React, { Component, useEffect, useState } from 'react';


import { Draggable, Droppable } from 'react-drag-and-drop'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage';
import { gettask, updatetask } from '../../../Services/services';
 
 export default function AppDragDropDemo({updatebtn,deletetask}) {
   const [tasks, settasks] = useState([]);
   const [taskdata, settaskdata] = useState({"backlog":[],"todo":[],"ongoing":[],"done":[]});
   const task={"backlog":[],"todo":[],"ongoing":[],"done":[]}
   useEffect(() => {
     gettask({email:encryptStorage.getItem("user").email}).then(res=>{
       //console.log(res.data.task)
       settasks(res.data.task)
       const task={"backlog":[],"todo":[],"ongoing":[],"done":[]}
       res.data.task.map((item,index)=>{
         var itemdata=item
         itemdata.index=index
         
         if(item.stage==0){
           task["backlog"].push(itemdata)
         }
         if(item.stage==1){
           task["todo"].push(itemdata)
         }
         if(item.stage==2){
           task["ongoing"].push(itemdata)
         }
         if(item.stage==3){
           task["done"].push(itemdata)
         }
         if(res.data.task.length-1==index){
           settaskdata(task)
         }
       })
       
     })
   }, []);
   const  onDrop=(index) =>{
    var task=tasks[index.task]
    task.stage=(0).toString()
    console.log(task)
    const data111=({email:encryptStorage.getItem("user").email,index:index.task,task:task})
     updatetask(data111).then(data=>{
       console.log(data)
       if(data.data.Status="true"){
         window.location.reload("/")
       }
     })
}
const  onDrop1=(index) =>{
  var task=tasks[index.task]
    task.stage=(1).toString()
    const data111=({email:encryptStorage.getItem("user").email,index:index.task,task:task})
     updatetask(data111).then(data=>{
       console.log(data)
       if(data.data.Status="true"){
         window.location.reload("/")
       }
     })
}
const  onDrop2=(index) =>{
  var task=tasks[index.task]
  task.stage=(2).toString()
  const data111=({email:encryptStorage.getItem("user").email,index:index.task,task:task})
   updatetask(data111).then(data=>{
     console.log(data)
     if(data.data.Status="true"){
       window.location.reload("/")
     }
   }) 
}
const  onDrop3=(index) =>{
  var task=tasks[index.task]
  console.log(task)
  task.stage=(3).toString()
   const data111=({email:encryptStorage.getItem("user").email,index:index.task,task:task})
   updatetask(data111).then(data=>{
     console.log(data)
     if(data.data.Status="true"){
       window.location.reload("/")
     }
   })
}
//console.log(taskdata)
 return(
<>
   
    <div className='row'>
  <div className='col-3' style={{height:"500px",border:"2px solid black",overflow:'auto'}}>
    <h1>
      Backlog
    </h1>
    <div>
    <div>
        
        <Droppable
            types={['task']} // <= allowed drop types
            onDrop={onDrop}>
            <ul className="Smoothie" style={{width:"200x" ,minHeight:"400px",border:"2px solid black"}}>
            {
              taskdata.backlog.map((item,index)=>{
                return(<Draggable type="task" data={item.index} key={index}><div style={{border:"2px solid black",marginLeft:"-35px",marginTop:"5px",marginRight:"5px",padding:"7px"}} ><p>{item.name}/ {item.deadline}</p>
                <p>{item.description}
                </p>
                <div >
                  <button type='button' className='btn btn-danger' onClick={()=>deletetask(item.index)} style={{marginRight:"20px"}}><i class="fa fa-trash"></i></button>
                  <button type='button' className='btn btn-warning' onClick={()=>updatebtn(item.index)}><i class="fa fa-refresh"></i></button>
                </div>
                </div></Draggable>)
              })
            }
            
       
            </ul>
        </Droppable>
    </div>
    </div>
  </div>
  <div className='col-3' style={{height:"500px",border:"2px solid black",overflow:'auto'}}>
    <h1>
      todo
    </h1>
    <div>
    <div>
    <Droppable
            types={['task']} // <= allowed drop types
            onDrop={onDrop1}>
            <ul className="Smoothie" style={{width:"200x" ,minHeight:"400px",border:"2px solid black"}}>
            {
              taskdata.todo.map((item,index)=>{
                return(<Draggable type="task" data={item.index} key={index}><div style={{border:"2px solid black",marginLeft:"-35px",marginTop:"5px",marginRight:"5px",padding:"7px"}} ><p>{item.name}/ {item.deadline}</p>
                <p>{item.description}
                </p>
                <div >
                  <button type='button' className='btn btn-danger' onClick={()=>deletetask(item.index)} style={{marginRight:"20px"}}><i class="fa fa-trash"></i></button>
                  <button type='button' className='btn btn-warning' onClick={()=>updatebtn(item.index)}><i class="fa fa-refresh"></i></button>
                </div>
                </div></Draggable>)
              })
            }
            
       
            </ul>
        </Droppable>
        
    </div>
    </div>
  </div>
  <div className='col-3' style={{height:"500px",border:"2px solid black",overflow:'auto'}}>
    <h1>
      Ongoing
    </h1>
    <div>
    <Droppable
            types={["task"]} // <= allowed drop types
            onDrop={onDrop2}>
            <ul className="Smoothie" style={{width:"200x" ,minHeight:"400px",border:"2px solid black"}}>
            {
              taskdata.ongoing.map((item,index)=>{
                return(<Draggable type="task" data={item.index} key={index}><div style={{border:"2px solid black",marginLeft:"-35px",marginTop:"5px",marginRight:"5px",padding:"7px"}} ><p>{item.name}/ {item.deadline}</p>
                <p>{item.description}
                </p>
                <div >
                  <button type='button' className='btn btn-danger' onClick={()=>deletetask(item.index)} style={{marginRight:"20px"}}><i class="fa fa-trash"></i></button>
                  <button type='button' className='btn btn-warning' onClick={()=>updatebtn(item.index)}><i class="fa fa-refresh"></i></button>
                </div>
                </div></Draggable>)
              })
            }
            
       
            </ul>
        </Droppable>
    </div>
  </div>
  <div className='col-3' style={{height:"500px",border:"2px solid black",overflow:'auto' }}>
    <h1>
      done
    </h1>
    <div>
    <Droppable
            types={["task"]} // <= allowed drop types
            onDrop={onDrop3}>
            <ul className="Smoothie" style={{width:"200x" ,minHeight:"400px",border:"2px solid black"}}>
            {
              taskdata.done.map((item,index)=>{
                return(<Draggable type="task" data={item.index} key={index}><div style={{border:"2px solid black",marginLeft:"-35px",marginTop:"5px",marginRight:"5px",padding:"7px"}} ><p>{item.name}/ {item.deadline}</p>
                <p>{item.description}
                </p>
                <div >
                  <button type='button' className='btn btn-danger' onClick={()=>deletetask(item.index)} style={{marginRight:"20px"}}><i class="fa fa-trash"></i></button>
                  <button type='button' className='btn btn-warning' onClick={()=>updatebtn(item.index)}><i class="fa fa-refresh"></i></button>
                </div>
                </div></Draggable>)
              })
            }
            
       
            </ul>
        </Droppable>
    </div>
  </div>
    </div>
    </>
  )
 }
 
 
   