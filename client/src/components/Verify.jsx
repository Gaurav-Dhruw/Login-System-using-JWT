import axios from 'axios';
import React, { useState, useEffect, useRef, Fragment, useContext } from 'react';
import { useHistory, useLocation , Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import {UserContext} from "../context/UserContextProvider";
import {useDispatch,useSelector} from "react-redux";
import {action} from '../store/action'



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
      console.log("verify will unmount");

        clearInterval(id);
      }
    }
  }, [delay]);
}

function Verify() {
  const user= useSelector(state=>state);
const dispatch = useDispatch();
  // const [user,setUser]=useContext(UserContext)
  const [state, setState] = useState({ loading: true, verified:false });
  const [redirectTime, setTime] = useState(5);
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();
  const cookies = new Cookies();
  const history = useHistory();
 



  useEffect(() => {
    console.log(location);
    axios.get(`/api${location.pathname}`)
    .then(res => {
      console.log(res);
      if (res.data.verified === true) {

        cookies.set("refresh_token", res.data.refresh_token, { path: "/", expires: new Date(new Date().getTime() + 24 * 3600 * 1000) });
        cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
      }
      dispatch(action({loggedIn:true,...res.data.payload}))
      setState({ loading: false, verified : true });


    }).catch(err => {
      console.log(err);
      setState({...state, loading: false });

    })

   return()=>      console.log("verify will unmount from verify directly");
  }, [])

  // const setIntervalId = useInterval(() => {
  //   if(!state.loading && state.verified){
     
  //     console.log(redirectTime)
  //     setTime((pre => pre - 1));
  //   }
  //   if (redirectTime === 0) {
  //     console.log("inside redirect if");
  //     setRedirect(true);
  //   }

  // }, 1000);







  
  return (
    <div>   

{state.loading ? <div class="d-flex justify-content-center">
  <div class="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
    <span class="visually-hidden" ></span>
  </div>
</div>

  :<Fragment>{!redirect?<Fragment>
    
    {state.verified ?<div class="alert alert-info" role="alert">
    Your email has been verified. Redirecting to Login Manager in <a href="http://localhost:3000/account">SITE</a>
  </div>:<div class="alert alert-danger" role="alert">
    Verification link is invalid
  </div>}
    </Fragment>:<Redirect to="/account"/>}
       
  </Fragment>

 }

</div> 
  
  
  )
}

export default Verify
