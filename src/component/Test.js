import React,{useEffect, useState} from 'react'
import {useParams,useNavigate,Link} from "react-router-dom" 

function Test() {
    const navigate=useNavigate();
    // const {id}=useParams();

    const [que,setque]=useState([])
    const [data,setdata]=useState(JSON.parse(localStorage.getItem("test"))||[])
    const [question,setquestion]=useState(data.questions[0].questionText);
     const[option,setoption]=useState(data.questions[0].options)
    const [optbutton,setoptbutton]=useState("");
    const [count,setcount]=useState(JSON.parse(localStorage.getItem("count"))||0)
    const [count5,setcount5]=useState(0)
    const [ans,setans]=useState(JSON.parse(localStorage.getItem("selectedopt"))||Array(data.questions.length).fill(null))
    const [corropt,setcoropt]=useState([])
    const [ansarr,setansarr]=useState([])
    const [count1,setcount1]=useState(0)
    // console.log(lccount);
    let lccount;
    let righ1=0;
    let wrong1=0
    useEffect(()=>{
            if(count<data.questions.length)
            {      
              setque(data.questions)
              setquestion(data.questions[count].questionText)
              setoption(data.questions[count].options)
            }
        },[count])


    useEffect(() => {
 
        if(data.questions[count].type==="Multiple-Response")
        {
            setoptbutton("checkbox")
        }
        else
        {
            setoptbutton("radio")
        }
    },)

    useEffect(() => 
    {
         if(ansarr!=undefined){
            let x=ansarr.sort();
            
            ans[count]=x   
            console.log("ans",ans);
            localStorage.setItem("selectedopt",JSON.stringify(ans))
         }
             
    }, [count1])


    
    useEffect(()=>{
        localStorage.setItem("selectedopt",JSON.stringify(ans))
    },[count5])    


      const setNextQuestion=()=>
      {
        if(count<data.questions.length-1)
            {            
                // setcount2((prev)=>prev+1)
                setcount((prev)=>prev+1)
            }
            // setansarr([])   
            lccount=localStorage.setItem("count",JSON.stringify(count+1))
        }
    
      const setpreviousQuestion=()=>
      {
            if(count<data.questions.length && count>0)
            {            
                setcount(prev=>prev-1)
                // setque(data.questions)
                // setquestion(data.questions[count].questionText)
                // setoption(data.questions[count].options)
            }   
            lccount=localStorage.setItem("count",JSON.stringify(count-1))
        }

        const finish=()=>{
                data.questions.map((obj)=>{
                corropt.push(obj.correctOptionIndex)
                })
                console.log("cor",corropt);
               
                for(let i=0;i<corropt.length;i++)
                {
                    if(JSON.stringify(corropt[i])==JSON.stringify(ans[i]))
                    {
                         righ1++;   
                    }
                    else
                    {
                        wrong1++;
                    }
                }
                localStorage.setItem("right",JSON.stringify(righ1));
                localStorage.setItem("wrong",JSON.stringify(wrong1));
        }


       const savecheckboxval=(e)=>
        {
            setcount5((prev)=>prev+1)
            
            if(e.target.checked)
            {

                let temp=[];
                temp.push(parseInt(e.target.value))
                // console.log("first");
                setansarr([...ansarr, ...temp])
                // console.log("ans",ansarr);
            }
            else
            {
                // console.log(e.target.value);
                let temp1;
                ansarr.includes(Number(e.target.value))
                ?(temp1= ansarr.filter((obj)=>obj !== Number(e.target.value)))
                : console.log("fi")
                console.log(temp1);
                setansarr(temp1)
                
                if(temp1!=undefined){
                let x=temp1.sort();
                    
                    ans[count]=x   
                    console.log("ans",ans);
                    localStorage.setItem("selectedopt",JSON.stringify(ans))
                 }     
            
             }
             setcount1(prev=>prev+1)
            // console.log("ans1",ansarr);
        }

        const saveradioval=(e)=>{


            let temp=parseInt(e.target.value)
            let temo=ans
            temo[count]=temp
            setans(temo)
            console.log("ans",ans);
            localStorage.setItem("selectedopt",JSON.stringify(temo))
            setcount5(prev=>prev+1)
        }
        const myfun={
          margin:"10px"
        };
        
        const checkoption=(index)=>{
              
            if(ans[count]===index)
            {
                return true;
            }
            
            if (ans.length > 0 &&ans[count]!=null) {
                for (let i = 0; i < 5; i++) 
                {
                    if (typeof ans[count] === "object") 
                    {
                    //   console.log("hi");
                    if (ans.length >= 0 && ans[count][i] === index) 
                    {
                      return true;
                    }
                  }
                }
              }
        }


    return (
    <div>
    <div className="container">
        <div className="row">
        <h1>My Interview Portal</h1>
            
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">{data.name}</div>
                    <div className="panel-body">
                        <form>                
                            <label>[{count+1}]{question} </label>
                            {    
                            option.map((op,index)=>{     
                            const function2=optbutton==="checkbox" ? savecheckboxval : saveradioval  
                            return(     
                            <div className="radio" key={op}>
                                <label>
                                    <input type={optbutton} 
                                    checked={checkoption(index)}
                                    name="option" 
                                    value={index} 
                                    onChange={function2}/> {op}
                                </label>
                            </div>
                            );
                            })    
                        }                  
                        </form>
                    </div>
                    <div className="panel-footer">
                    <Link to={`/Test/${data._id}/${data.questions[count]._id}`}>    
                      <button className="btn btn-success" disabled={count==0} style={myfun} onClick={()=>setpreviousQuestion()}
                      >Previous</button>
                        </Link>


                    <Link to={`/Test/${data._id}/${data.questions[count]._id}`}>    
                    <button className="btn btn-success" disabled={count>data.questions.length-2} onClick={()=>setNextQuestion()}>Next</button>
                    </Link>

                    <Link to={`/Finish`}>    
                        <button className="pull-right btn btn-danger" disabled={count<data.questions.length-1} onClick={()=>finish()} >Finish</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

        {/* {(que.length==count && count!=0 ) ? complete() : ""} */}

    </div>
  )
}

export default Test