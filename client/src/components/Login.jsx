import React, { Fragment, useState,useEffect, useContext } from 'react'
import axios from "axios";
import Fade from "react-reveal/Fade";
import Alert from 'react-bootstrap/Alert';
import {useHistory,Link, Redirect} from "react-router-dom"
import Cookies from "universal-cookie";
import {UserContext} from "../context/UserContextProvider";
import {useSelector , useDispatch} from "react-redux";
import {action} from "../store/action"


import { validate } from '../assets/js/validate';


const useConstructor=(callBack = () => {})=> {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

function Login(props) {
	const [show,setShow]=useState(false);
	const user= useSelector(state=>state.reducer);
	const  dispatch = useDispatch()

	const cookies = new Cookies();
	const history= useHistory();
	const [validation, setValidation] = useState({ email: false, password: false });
	const [warning, setWarning] = useState({ email: false, password: false })
	const [alert, setAlert] = useState({ show: false, variant: "danger" });
	const [redirect, setRedirect] = useState(false);

	const [userData, setUserData] = useState({});


	useConstructor(()=>{
        console.log("inside login constructor")

        // if (cookies.get("refresh_token")) {
           

        // console.log("inside if");
		//  setRedirect(true);
		// 	// history.push("/")
		// 	}

    })
	// useEffect(()=>{
	// 	if(cookies.get("refresh_token")){
	// 		history.push('/account')
	// 	}
	// },[user])


	useEffect(() => {
		setShow(true);

		return()=>console.log("login will unmount");
		
	}, []);

	const submit = (e) => {
		e.preventDefault();

		let loginData = { email: userData.email, loginPassword: userData.password };
		validate(loginData, validation, setValidation);


		setWarning({ email: !validation.email, password: !validation.password })



		if (validation.email === true && validation.password === true) {

			axios.post("/api/login", userData)
				.then(res => {

					console.log(res)

					cookies.set("refresh_token", res.data.refresh_token, { path: "/", expires: new Date(new Date().getTime() + 24 * 3600 * 1000) });
					cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
					console.log("inside response login, before")
					// dispatch(action({loggedIn:true,...res.data.user_data}))
					console.log("inside response login, after dispatch")
					// setLoginStatus(true);

					
						
						
					

					// setRedirect(true);

					
				})
				.catch(err => {
					console.log(err);
					
					console.log(err.response.status);

					let error = err.response;

					return setAlert({ ...alert, show: true, message: error.data.error });


				})
		}

	}


	const handleInput = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	return (
		<Fragment>
			{console.log("inside render login")}
			{!cookies.get("refresh_token")?
		<Fragment>
	   <div style={{padding:"20px", paddingBottom:"0"}}><Link to="/"><button className="btn btn-dark">Go to Home</button></Link></div>
			<Fade bottom when={show} duration={600}>
       
	   <div>
		   {/* {console.log(validation, "warning", warning)} */}
		   <div class="signup-form">
				
			   <form >
				   <h2>Login</h2>

				   <hr />
				   <div class="form-group">
					   <div class="input-group">
						   <div class="input-group-prepend">
							   <span class="input-group-text">
								   <i class="fa fa-paper-plane"></i>
							   </span>
						   </div>
						   <input type="email" onChange={handleInput} class="form-control" name="email" placeholder="Email Address" required="required" />
					   </div>
					   <Fade duration={500} top when={warning.email}>

						   <div className="warning">enter a valid email</div>
					   </Fade>
				   </div>

				   <div class="form-group">
					   <div class="input-group">
						   <div class="input-group-prepend">
							   <span class="input-group-text">
								   <i class="fa fa-lock"></i>
							   </span>
						   </div>
						   <input type="text" onChange={handleInput} class="form-control" name="password" placeholder="Password" required="required" />
					   </div>
					   <Fade duration={500} top when={warning.password}>

						   <div className="warning">required</div>
					   </Fade>
				   </div>


				   <div class="form-group">
					   <button type="submit" onClick={submit} class="btn btn-primary btn-lg">Login</button>
				   </div>
				   <div className="status-container">

					   <Alert transition={true} show={alert.show} variant={alert.variant}>
						   {alert.message}
					   </Alert>
				   </div>
			   </form>
			   <div class="text-center"><Link to="/signup" className=" switchBtn" >Create Account</Link></div>
		   </div>



	   </div>
	   </Fade></Fragment>:<Redirect to ="/account"></Redirect>}
		
		</Fragment>
		  
	)
}

export default Login
