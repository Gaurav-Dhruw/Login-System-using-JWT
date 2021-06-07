import React,{Fragment, useState} from 'react'
import axios from "axios";
import Fade from "react-reveal/Fade";
import { validate} from '../assets/js/validate';



function Login(props) {
	const [validation,setValidation]= useState({user_name:false,email:false,password:false});
	const [warning,setWarning]= useState({user_name:false,email:false,password:false})
    const [show,setShow]= useState({show:false});
    const [userData,setUserData]= useState({});

	const submit= (e)=>{
		e.preventDefault();

		validate(userData,validation,setValidation);
		setWarning({user_name:!validation.user_name,email: !validation.email, password:!validation.password })

		if(validation.email===true&& validation.user_name===true&& validation.password===true){
		
			axios.post("/api/login",userData)
			.then(res=>{
	
				console.log(res)
				setShow({show:true})
			})
			.catch(err=>console.log(err))
		}
		
		}


    const handleInput= (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    return (
        <div>

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

				<div className="warning">server message</div>
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

				<div className="warning">server message</div>
				</Fade>
        </div>
		
       
		<div class="form-group">
            <button type="submit" onClick={submit} class="btn btn-primary btn-lg">Login</button>
        </div>
    </form>
	<div class="text-center"><button className=" switchBtn" onClick={props.handleSwitch}>Create Account</button></div>
</div>
            
            
            
        </div>
    )
}

export default Login
