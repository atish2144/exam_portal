import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom' 

function Finish() {
    const navigate=useNavigate()
    const [data,setdata]=useState(JSON.parse(localStorage.getItem("test"))||[])
    let right=JSON.parse(localStorage.getItem("right"))
    let wrong=JSON.parse(localStorage.getItem("wrong"))


    // console.log(data.questions.length)
    // console.log("right answers",right)
    // console.log("wrong answers",wrong)

    const clear=()=>
    {
        localStorage.clear();
    }


  return (
    <div>

<div className="container">
        <div className="row">
            <h1>My Interview Portal</h1>
            
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">{data.name} - Result</div>
                    <div className="panel-body">
                        <center>
                            <h2 className="">Total no of Questions: {data.questions.length} </h2>
                            <h3 className="text-success">Correct Answers: {right}</h3>
                            <h3 className="text-danger">wrong Answers: {wrong}</h3>
                      
                            <button className="btn btn-warning" onClick={()=>{clear();navigate("/")}}> Home</button>                      
                            {/* <h3 className="text-success">Correct Answers: {right}
                            <span className="text-danger">Wrong Answers: {wrong}</span></h3> */}
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Finish