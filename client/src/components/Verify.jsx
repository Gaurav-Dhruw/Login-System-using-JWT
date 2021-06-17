import axios from 'axios';
import React, { useState, useEffect, useRef, Fragment} from 'react';
import {  useLocation , Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {action} from '../store/action'



function useInterval (callback, delay) {
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

        clearInterval(id);
      }
    }
  }, [delay]);
}





function Verify() {



const dispatch = useDispatch();
  const [state, setState] = useState({ loading: true, verified:false });
  const [redirectTime, setTime] = useState(5);
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();
  const cookies = new Cookies();
 



  useEffect(() => {
    axios.get(`/api${location.pathname}`)
    .then(res => {
      if (res.data.verified === true) {

        cookies.set("refresh_token", res.data.refresh_token, { path: "/", expires: new Date(new Date().getTime() + 24 * 3600 * 1000) });
        cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
      }
      dispatch(action({loggedIn:true,...res.data.payload}))
      setState({ loading: false, verified : true });


    }).catch(err => {
      setState({...state, loading: false });

    })

  }, [])

  useInterval(() => {
    if(!state.loading && state.verified){
     
      setTime((pre => pre - 1));
    }
    if (redirectTime === 0) {
      setRedirect(true);
    }

  }, 1000);







  
  return (
    <div className="verify-cont">

{state.loading ? <div className="d-flex justify-content-center">
  <div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
    <span className="visually-hidden" ></span>
  </div>
</div>

  :<Fragment>{!redirect?<Fragment>
    
    {state.verified ?<div className="alert alert-info" role="alert">
    Your email has been verified. Redirecting to Login Manager in {redirectTime}
  </div>:<div className="alert alert-danger" role="alert">
    Verification link is invalid
  </div>}
    </Fragment>:<Redirect to="/account"/>}
       
  </Fragment>

 }

</div> 
  
  
  )
}

export default Verify
