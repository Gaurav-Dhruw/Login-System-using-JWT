import React, { Fragment, useState,useEffect} from 'react'
import axios from "axios";
import Fade from "react-reveal/Fade";
import Alert from 'react-bootstrap/Alert';
import {Link, Redirect} from "react-router-dom"
import Cookies from "universal-cookie";
import {useSelector , useDispatch} from "react-redux";
import {action} from "../store/action"


import { validate } from '../assets/js/validate';




function Login(props) {
	const [show,setShow]=useState(false);
	const user= useSelector(state=>state.reducer);
	const  dispatch = useDispatch()

	const cookies = new Cookies();
	const [validation, setValidation] = useState({ email: false, password: false });
	const [warning, setWarning] = useState({ email: false, password: false })
	const [alert, setAlert] = useState({loading:false, show: false, variant: "danger" });

	const [userData, setUserData] = useState({});


	
	

	useEffect(() => {
		setShow(true);

		
	}, []);

	const submit = (e) => {
		e.preventDefault();

		let loginData = { email: userData.email, loginPassword: userData.password };
		validate(loginData, validation, setValidation);


		setWarning({ email: !validation.email, password: !validation.password })



		if (validation.email === true && validation.password === true) {
			setAlert({...alert,loading:true})
			axios.post("/api/login", userData)
				.then(res => {


					cookies.set("refresh_token", res.data.refresh_token, { path: "/", expires: new Date(new Date().getTime() + 24 * 3600 * 1000) });
					cookies.set("access_token", res.data.access_token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });
					dispatch(action({loggedIn:true,...res.data.user_data}))

					
	
					
				})
				.catch(err => {
					

					let error = err.response;

					return setAlert({ ...alert,loading:false, show: true, message: error.data.error });


				})
		}

	}


	const handleInput = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	return (
		<Fragment>


{/* {console.log(cookies.get("refresh_token"), user.loggedIn)} */}

			{!cookies.get("refresh_token")?
			
		<Fragment>
	   <div className="go-back-btn" style={{padding:"20px"}}><Link to="/"><button className="btn btn-dark">Go to Home</button></Link></div>
			<Fade bottom when={show} duration={600}>
       
	   <div  className="form-container">
		   <div className="signup-form">
				
			   <form >
				   <h2>Login</h2>

				   <hr />
				   <div className="form-group">
					   <div className="input-group">
						   <div className="input-group-prepend">
							   <span className="input-group-text">
								   <i className="fa fa-paper-plane"></i>
							   </span>
						   </div>
						   <input type="email" onChange={handleInput} className="form-control" name="email" placeholder="Email Address" required="required" />
					   </div>
					   <Fade duration={500} top when={warning.email}>

						   <div className="warning">enter a valid email</div>
					   </Fade>
				   </div>

				   <div className="form-group">
					   <div className="input-group">
						   <div className="input-group-prepend">
							   <span className="input-group-text">
								   <i className="fa fa-lock"></i>
							   </span>
						   </div>
						   <input type="text" onChange={handleInput} className="form-control" name="password" placeholder="Password" required="required" />
					   </div>
					   <Fade duration={500} top when={warning.password}>

						   <div className="warning">required</div>
					   </Fade>
				   </div>


				   <div className="form-group">
					   <button type="submit" onClick={submit} className="btn btn-primary btn-lg">Login</button>
				   </div>
				   <div className="status-container">
				   {alert.loading ? <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>:

					   <Alert transition={true} show={alert.show} variant={alert.variant}>
						   {alert.message}
					   </Alert>}
				   </div>
			   </form>
			   <div className="text-center"><Link to="/signup" className=" switchBtn" >Create Account</Link></div>
		   </div>



	   </div>
	   </Fade></Fragment>:<Redirect to ="/account"></Redirect>}
		
		</Fragment>
		  
	)
}

export default Login
