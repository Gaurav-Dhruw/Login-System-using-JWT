import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios";
import Fade from "react-reveal/Fade";
import Alert from 'react-bootstrap/Alert';
import {Link, useHistory} from "react-router-dom";
import { validate } from '../assets/js/validate';
import Cookies from "universal-cookie";



const useConstructor=(callBack = () => {})=> {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

function SignUp(props) {
	const [show,setShow] = useState(false);
	const [validation, setValidation] = useState({ user_name: false, email: false, password: false });
	const [warning, setWarning] = useState({ user_name: false, email: false, password: false });
	const [status, setStatus] = useState({ loading: false, variant: "light", show:false });

	const [userData, setUserData] = useState({});

	const cookies = new Cookies();
	const history= useHistory();



	useConstructor(()=>{

        if (cookies.get("refresh_token")) {
    
        history.push("/")
		}

    })


	useEffect(() => {
		setShow(true)
	
	}, [])

	const submit = async (e) => {
		e.preventDefault();
		validate(userData, validation, setValidation);
		setWarning({ user_name: !validation.user_name, email: !validation.email, password: !validation.password })

		if (validation.email === true && validation.user_name === true && validation.password === true) {

			setStatus({ ...status, loading: true })

			axios.post("/api/signup", userData)
				.then(res => {
					console.log(res)
					
					
					setStatus({ loading: false, show: true, variant: "success", statusMessage:"Email has been sent. Verify it to continue"})

					
						
					

					
				
					
				})
				.catch(err => {
					console.log(err)
					setStatus({ loading: false, show: true, variant: "danger", statusMessage: err.response.data.message })
					
				})

		}
	}

	const handleInput = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}


	return (
		<Fragment>
			 <div style={{padding:"20px", paddingBottom:"0"}}><Link to="/"><button className="btn btn-dark">Go to Home</button></Link></div>
			<Fade top duration={600} when={show}>
			<div>
			<div class="signup-form">

				<form >
					<h2>Sign Up</h2>
					<p>Please fill in this form to create an account!</p>
					<hr />
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">
									<span class="fa fa-user"></span>
								</span>
							</div>
							<input type="text" onChange={handleInput} class="form-control" name="user_name" placeholder="Username" required="required" />
						</div>
						<Fade duration={500} top when={warning.user_name}>
							<div className="warning">user-name must be atleast 5 char long</div>

						</Fade>
					</div>
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

							<div className="warning">email is required / invalid</div>
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

							<div className="warning">min 8 char, must contain number and special character </div>
						</Fade>
					</div>
					{/* <div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">
									<i class="fa fa-lock"></i>
									<i class="fa fa-check"></i>
								</span>
							</div>
							<input type="text" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
						</div>
					</div> */}

					<div class="form-group">
						<button type="submit" onClick={submit} class="btn btn-primary btn-lg">Sign Up</button>
					</div>
					<div className="status-container">

						{status.loading ? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>:
							<Alert transition={true} show={status.show} variant={status.variant}>
								{status.statusMessage}
							</Alert>
						}
					</div>




				</form>
				<div class="text-center">Already have an account? <Link to="/login" className="switchBtn" >Login here</Link></div>
			</div>
			</div>
			</Fade>

		</Fragment>
	)
}

export default SignUp;




