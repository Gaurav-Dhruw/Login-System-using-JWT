import axios from 'axios';
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {useDispatch,useSelector} from "react-redux";
import {action} from "../store/action";


function Navbar(props) {
  const user = useSelector(state => state.reducer);
  const dispatch = useDispatch()
  const cookies = new Cookies();

  const logout=()=>{
    axios.get("/api/logout")
    .then(res=>{
      cookies.remove('refresh_token',{path:"/"});
      cookies.remove('access_token',{path:"/"});
      dispatch(action({loggedIn:false}))
      // 

    })
    .catch(err=>console.error(err))
  }




  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Login Manager</Link>

      <ul className="navbar-nav ">
        {cookies.get("refresh_token") ? <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="material-icons" style={{ fontSize: "2rem",paddingRight:"8px" }}>&#xe853;</span>{user.user_name}</a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a onClick={logout} className="dropdown-item" href="#" style={{display: "flex",
  }} ><span className="material-icons"  style={{paddingRight:"8px"}}>&#xe9ba;
</span>Logout</a>
          </div>
        </li> : <Fragment>
          <li className="nav-item">
            <Link to="/login"><button type="button" className="login-btn btn btn-primary"><span className="material-icons" style={{paddingRight:"8px" }}>
              &#xea77;
</span>Login</button></Link>
          </li>
          <li className="nav-item">

            <Link to="/signup"><button className="btn btn-primary signup-btn"><span className="material-icons" style={{paddingRight:"8px" }}>&#xe7fe;</span>
Sign Up </button>
            </Link>
          </li>

        </Fragment>}


      </ul>
    </nav>
  )
}

export default Navbar
