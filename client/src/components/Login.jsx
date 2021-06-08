import React,{Fragment, useState} from 'react'
import axios from "axios";
import Fade from "react-reveal/Fade";
import Alert from 'react-bootstrap/Alert';

import { validate} from '../assets/js/validate';



function Login(props) {
	const [validation,setValidation]= useState({email:false,password:false});
	const [warning,setWarning]= useState({email:false,password:false})
    const [alert,setAlert]= useState({show:false,variant:"danger"});
    const [userData,setUserData]= useState({});

	const submit= (e)=>{
		e.preventDefault();

		let loginData = {email:userData.email,loginPassword:userData.password};
		validate(loginData,validation,setValidation);
		
		
			setWarning({email: !validation.email,password:!validation.password})

		
		// setWarning({email: !validation.email,password:!validation.password})
		
		if(validation.email===true&& validation.password===true){
		
			axios.post("/api/login",userData)
			.then(res=>{
	
				console.log(res)
				if(res.data.authentication){

				}
				
				else
				setAlert({...alert,show:true,message:"password is incorrect"})
			})
			.catch(err=>{
				setAlert({...alert,show:true,message:"Email is not registered"})

		})
		}
		
		}


    const handleInput= (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    return (
        <div>
{console.log(validation,"warning", warning)}
<div class="signup-form">
				
    <form >
		<h2>Login</h2>
		
		<hr/>
        <div class="form-group">
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">
						<i class="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" onChange={handleInput} class="form-control" name="email" placeholder="Email Address" required="required"/>
			</div>
			<Fade  duration={500} top when={warning.email}>

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
				<input type="text" onChange={handleInput} class="form-control" name="password" placeholder="Password" required="required"/>
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
	<div class="text-center"><button className=" switchBtn" onClick={props.handleSwitch}>Create Account</button></div>
</div>
            
            
            
        </div>
    )
}

export default Login
