import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Verify from "./components/Verify";
import Account from "./components/Account";

import axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies();


axios.interceptors.response.use(response=>{
  return response;
},async error=>{
  if(error.response.status===401 && cookies.get("refresh_token")){

    try{
      const res = await axios.post("/api/gen/accesstoken",{refresh_token:cookies.get("refresh_token")});
      const retryRequest= error.response.config;
        cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });

        
        return axios.request(retryRequest);

    }
    catch(err){
      throw err;
    }



    
  }
  throw error;
})



axios.interceptors.request.use(request=>{

  if(cookies.get("refresh_token")){
    
    request.headers.Authorization= `Bearer ${cookies.get("access_token")}`;
  }
  return request;
})





function App() {

  
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


        <Login ></Login>
     
 </Route>

 <Route path="/signup">



 
       
    <SignUp ></SignUp>
    

     
     
    
</Route>

         
    <Route path="/">
    

<Main></Main>
    </Route>
       


  
  </Switch>
  </Router>
  
  );
}

export default App;
