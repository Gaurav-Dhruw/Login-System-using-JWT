import axios from 'axios';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";


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
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Verify() {
  const [state, setState] = useState({ loading: true, verified:false });
  const [redirectTime, setTime] = useState(5);
  const location = useLocation();
  const cookies = new Cookies();
  const history = useHistory();
  let setIntervalId;



  useEffect(() => {
    console.log(location);
    axios.get(`/api${location.pathname}`)
    .then(res => {
      console.log(res);
      if (res.data.verified === true) {

        cookies.set("refresh_token", res.data.refresh_token, { path: "/", expires: new Date(new Date().getTime() + 24 * 3600 * 1000) });
        cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
      }
      setState({ loading: false, verified : true });

     



    }).catch(err => {
      console.log(err);
      setState({...state, loading: false });

    })

    return () => {
      clearInterval(setIntervalId);
    }

  }, [])

  useInterval(() => {
    if(!state.loading && state.verified){
     
      console.log(redirectTime)
      setTime((pre => pre - 1));
    }
    if (redirectTime === 0) {
      console.log("inside redirect if")
      history.push("/account");

    }

  }, 1000);




  return (
    <div className="verify-cont">

      {state.loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
          <span class="visually-hidden" ></span>
        </div>
      </div>

        :<Fragment>
          {state.verified?<div class="alert alert-info" role="alert">
          Your email has been verified. Redirecting to Login Manager in {redirectTime}
        </div>:<div class="alert alert-danger" role="alert">
          Verification link is invalid
        </div>}
             
        </Fragment>

        // <div className="verify-header">
        //     <h2>Email Verified</h2>
        // </div>
       }

    </div>
  )
}

export default Verify
