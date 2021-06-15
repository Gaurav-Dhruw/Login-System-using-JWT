import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Verify from "./components/Verify";
import Account from "./components/Account";

import axios from "axios";
import Cookies from "universal-cookie";
import { Fragment } from "react";
import {action} from "./store/action"


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

const useConstructor=(callBack = () => {})=> {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}




function App() {
  const [loading,setLoading]= useState(true);
  const user= useSelector(state=>state.reducer);
	const  dispatch = useDispatch();

  useConstructor(()=>{

    console.log("INSISDE APP CONSTRUCTOR")
		
		if (cookies.get("refresh_token") ) {

      axios.get("/api/protected/account")
      .then(res=>{
        console.log(res)

        dispatch(action({loggedIn:true,...res.data}));
        setLoading(false)

      }).catch(err=>{
        console.log(err)

      })

			
		
		}

    else{
      setLoading(false)
    }
    })

  
  return (
    <Router>
  
  <Fragment>{loading?
  <div class="d-flex justify-content-center" style={{height:"100vh", alignItems:"center"}}>
  <div class="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
    <span class="visually-hidden" ></span>
  </div>
  
    
</div>:


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
}


 

  </Fragment>
  </Router>
  
  );
}

export default App;
