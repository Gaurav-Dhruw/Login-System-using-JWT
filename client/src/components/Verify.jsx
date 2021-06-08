import axios from 'axios';
import React , {useState, useEffect}from 'react'

function Verify() {
    const[state,setState]= useState({loading:true});

    useEffect(() => {
      axios.get("/api/verify/adda570046e91da9fc53d5f08d4028d0").then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      
    }, [])
    return (
        <div className="verify-cont">
            
            {state.loading? <div class="d-flex justify-content-center">
  <div class="spinner-border text-light"  style={{width: "3rem", height: "3rem"}} role="status">
    <span class="visually-hidden" ></span>
  </div>
</div>
            
           :

            // <div className="verify-header">
            //     <h2>Email Verified</h2>
            // </div>
            <div class="alert alert-info" role="alert">
  A simple primary alert with <a href="#" class="alert-link">an example link</a>Give it a click if you like.
</div> }
        <button onClick={()=>{setState({...state,loading:!state.loading})}}> click</button>
            
        </div>
    )
}

export default Verify
