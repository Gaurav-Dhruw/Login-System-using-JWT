import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import {action} from "../store/action";
import {useDispatch,useSelector} from "react-redux";
import { Fragment } from 'react';
import Navbar from "./Navbar"


// const useConstructor=(callBack = () => {})=> {
//     const [hasBeenCalled, setHasBeenCalled] = useState(false);
//     if (hasBeenCalled) return;
//     callBack();
//     setHasBeenCalled(true);
//   }

function Main() {

    const user= useSelector(state=>state.reducer);
    const dispatch = useDispatch();
    const cookies = new Cookies();


    // useConstructor(()=>{

    //     if (cookies.get("refresh_token") ) {
 
    //     dispatch(action({loggedIn:true}));

    //     }

    // })

    return (
        <Fragment>
            <Navbar></Navbar>
      
        <section className="main-section">

            <div className="header">
                    <h1>Welcome to Login Manager</h1>
            </div>

            <div className="desc-cont">
                <p>This is a login/signup system, which also verifies the user's email before registeration.</p>
                
            </div>
            <div className="get-started">
                        {cookies.get("refresh_token") && user.loggedIn?<Link to="/account"><button type="button" class="btn btn-primary">Go to Account</button></Link>:<div></div>}
            </div>
            

            
        </section>

        </Fragment>
    )
}

export default Main
