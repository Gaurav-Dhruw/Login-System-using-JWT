import { Router, Switch, route } from "react-router";
import React, { Fragment , useState} from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Fade from "react-reveal/Fade"



function App() {

  const [state,setState]=useState({show:false});

  const handleClick=()=>{
    setState({show: !state.show})
  }
  return (<Fragment>


 

 <div style={{minHeight:"100vh",maxHeight:"100vh",overflow:"hidden", backgroundColor:"#19aa8d"}}>
        <Fade bottom collapse when={state.show}>
        <Login handleSwitch={handleClick}></Login>
        </Fade>
        <Fade top collapse when={!state.show}>
        
     <SignUp handleSwitch={handleClick}></SignUp>
     

        </Fade>
      
         
       
      </div>


  </Fragment>
  
  );
}

export default App;
