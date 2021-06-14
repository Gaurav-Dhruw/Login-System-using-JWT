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
    <nav class="navbar  navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">Login Manager</Link>

      <ul class="navbar-nav ">
        {user.loggedIn ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="material-icons" style={{ fontSize: "2rem",paddingRight:"8px" }}>&#xe853;</span>{user.user_name}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a onClick={logout} class="dropdown-item" href="#" style={{display: "flex",
  }} ><span class="material-icons"  style={{paddingRight:"8px"}}>&#xe9ba;
</span>Logout</a>
          </div>
        </li> : <Fragment>
          <li class="nav-item">
            <Link to="/login"><button type="button" class="login-btn btn btn-primary"><span class="material-icons">
              &#xea77;
</span>Login</button></Link>
          </li>
          <li class="nav-item">

            <Link to="/signup"><button className="btn btn-primary signup-btn"><span class="material-icons">&#xe7fe;</span>
Sign Up </button>
            </Link>
          </li>

        </Fragment>}


      </ul>
    </nav>
  )
}

export default Navbar
