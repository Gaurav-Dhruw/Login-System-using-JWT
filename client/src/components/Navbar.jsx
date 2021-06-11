import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function Navbar() {
  const cookies = new Cookies();
  return (
    <nav class="navbar  navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>

      <ul class="navbar-nav ">
        {cookies.get("refresh_token") ? <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="material-icons" style={{ fontSize: "2rem" }}>&#xe853;</span></a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Logout</a>
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
