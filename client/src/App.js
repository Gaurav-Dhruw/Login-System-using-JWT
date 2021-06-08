import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Fragment , useState} from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Fade from "react-reveal/Fade"
import Main from "./components/Main";
import Navbar from  "./components/Navbar";
import Verify from "./components/Verify";


function App() {

  const [state,setState]=useState({show:false});

  const handleClick=()=>{
    setState({show: !state.show})
  }
  return (
  <Router>
    <Switch>
  
    <Route path="/verify">
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
