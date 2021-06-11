import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Fragment , useState} from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Fade from "react-reveal/Fade"
import Main from "./components/Main";
import Navbar from  "./components/Navbar";
import Verify from "./components/Verify";
import Account from "./components/Account";

import axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies;


axios.interceptors.response.use(response=>{
  console.log(response);
  return response;
},async error=>{
  console.log(error.response);
  if(error.response.status===401 && cookies.get("refresh_token")){

    try{
      const res = await axios.get("/api/gen/accesstoken");
      
        cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime + 1 * 60 * 1000) });

        // const {url, method}= error.response.config;
        
        const retryRequest = await axios({...error.response.config});

    }
    catch(err){
      console.log(err)
      throw err;
    }



    
  }
  throw error;
})



axios.interceptors.request.use(request=>{

  if(cookies.get("refresh_token")){
    
    request.headers.Authorization= `Bearer ${cookies.get("access_token")}`;
  }
  console.log(request);
  return request;
})


function App() {

  const [state,setState]=useState({show:false});

  const handleClick=()=>{
    setState({show: !state.show})
  }
  return (
  <Router>
    <Switch>
    

    <Route path="/account">
    <Account/>


    </Route>
  
    <Route path="/verify/:verification_token">
    <Verify/>


    </Route>

 <Route path="/login">


 <div style={{minHeight:"100vh",maxHeight:"100vh",overflow:"hidden", backgroundColor:"#19aa8d"}}>
        <Fade bottom collapse when={state.show}>
        <Login handleSwitch={handleClick}></Login>
        </Fade>
        <Fade top collapse when={!state.show}>
        
     <SignUp handleSwitch={handleClick}></SignUp>
     

        </Fade>
      
      </div>
 </Route>

         
    <Route path="/">
    <Navbar></Navbar>

<Main></Main>
    </Route>
       


  
  </Switch>
  </Router>
  
  );
}

export default App;
