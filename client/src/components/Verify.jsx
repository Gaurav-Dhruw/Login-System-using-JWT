import axios from 'axios';
import React , {useState, useEffect}from 'react';
import {useLocation} from "react-router-dom";
import Cookies from "universal-cookie"

function Verify() {
    const[state,setState]= useState({loading:true});
    const location =useLocation();
    const cookies = new Cookies()
    useEffect(() => {
      console.log(location);
      axios.get(`/api${location.pathname}`).then(res=>{
        console.log(res);
        if(res.data.verified===true){

          cookies.set("refresh_token",res.data.refresh_token, {path:"/", expires: new Date(new Date().getTime + 2*60*1000)});
          cookies.set("access_token",res.data.access_token, {path:"/", expires: new Date(new Date().getTime + 1*60*1000)});
        }
        

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
