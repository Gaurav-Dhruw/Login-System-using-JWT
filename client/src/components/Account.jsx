import React, { useEffect, useState, Fragment, useContext } from 'react';
import Fade from "react-reveal/Fade";
import {validate} from "../assets/js/validate";
import {UserContext} from "../context/UserContextProvider"
import Alert from 'react-bootstrap/Alert';

import Cookies from "universal-cookie";
import { Redirect, useHistory } from 'react-router';
import Navbar from './Navbar';
import axios from 'axios';

const useConstructor=(callBack = () => {})=> {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

function Account(props) {
    const [data, setData] = useState({});
    const [validation, setValidation] = useState({  password: false });
	const [warning, setWarning] = useState({ password: false });
    const [loginStatus, setLoginStatus] = useState(false);
	const [status, setStatus] = useState({ loading: false, variant: "light", show:false });
    const [deleteStatus, setDeleteStatus] = useState({ loading: false, variant: "light", show:false });


    const [loading, setLoading] = useState(true);
    const [fade, setShow] = useState({showP:false, showD:false, showA:true});
    const [user,setUser]= useContext(UserContext);

    const cookies = new Cookies();
    const history = useHistory();

    useConstructor(()=>{

        if (cookies.get("refresh_token")) {
            setUser({...user,loggedIn:true})
            return setLoginStatus(true)           

        }

        
        history.push("/login")

    })
    
    
    
    useEffect(() => {

        axios.get("/api/protected/account")
        .then(res=>{
            console.log(res);
            setData({...data,...res.data});
            setUser({...user,...res.data});
            setLoading(false);
        })
        .catch(err=>{

        })
        

    }, [])

    const handleInput = (e) => {
        setData({ ...data, password: e.target.value })

    }

   

  

    const changePassword=(e)=>{
        e.preventDefault();

        validate(data, validation, setValidation);
		setWarning({password: !validation.password })

		if (validation.password === true) {

        axios.put("/api/protected/account/password/change",{password: data.password })
        .then(res=>{
            console.log(res);
            setStatus({ loading: false, variant: "success", show:true ,statusMessage:res.data.message})
        })
        .catch(err=>{

            setStatus({ loading: false, variant: "danger", show:true ,statusMessage:err.response.data.error})

            
        })

    }
    }

    const deleteAccount=()=>{
        setDeleteStatus({loading:true});
        axios.delete("/api/protected/account/delete")
        .then(res=>{
            console.log(res);
            cookies.remove("refresh_token");
            cookies.remove("access_token");
            history.push("/")

        })
        .catch(err=>{
            setDeleteStatus({loading:false,  variant:"danger", statusMessage:"Error occured while deleting account"})

        })
    }

    const renderDisplay=()=>{

        if(fade.showP){

        return (<Fade   duration={1000} >

        <form className="password-form" >
            <div className="input-container">
            <input type="text" placeholder="Enter new password" onChange={handleInput} />
            <Fade duration={500} top when={warning.password}>

							<div className="warning">min 8 char, must contain number and special character </div>
			</Fade>

            </div>
            <button className="btn btn-primary" type="submit" onClick={changePassword}>Change Passowrd</button>
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
    </Fade>)

        }

        else if(fade.showA){
    return (<Fade duration={1000}>
        <div className="account-container">
            {loading ? <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div> : <div className="account-details">
                <p>User: {data.user_name}</p>
                <p>Email: {data.email}</p>
            </div>}

        </div>
    </Fade>)

        }


    return (<Fade duration={1000}>
        <div className="delete-container">
        <button type="button" onClick={deleteAccount} class="btn btn-danger">Confirm Delete</button>
        <div className="status-container">

						{deleteStatus.loading ? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>:
							<Alert transition={true} show={deleteStatus.show} variant={deleteStatus.variant}>
								{deleteStatus.statusMessage}
							</Alert>
						}
					</div>
        </div>
    </Fade>)
    }

 

   

    const handleFade=(e)=>{
        e.preventDefault();
        let newFade={};

        // console.log(fade,Object.keys(fade))
        Object.keys(fade).forEach(elm=>{
            console.log(elm, e.target.name)
            if(e.target.name===elm){
                    newFade[elm]=true;
            }
            else
            newFade[elm]=false;

        })
        console.log("active",newFade)

        setShow(newFade);
    }
    return (
        <Fragment>
            {console.log(fade,"fade", loginStatus)}
            {user.loggedIn ?

                <Fragment>
                    
                    <Navbar />



                    <section className="account">
                        <div className="account-header">
                            <h2>Settings</h2>
                        </div>

                        <div className="display">
                            <div className="btn-container">

                                <button onClick={(e)=>{handleFade(e)}} name="showA"type="button" class="btn btn-light">Account Details</button>


                                <button type="button" name="showP" onClick={handleFade} class="btn btn-light">
                                    Change Password
                </button>
                                <button type="button" name="showD" onClick={handleFade} class="btn btn-light">
                                    Delete Account
                </button>
                            </div>
                            <div className="display-area">
                                
                               {renderDisplay()}
                            </div>

                        </div>
                    </section>

                </Fragment>


                :

                <Redirect to="/login"></Redirect>}


        </Fragment>

    )
}

export default Account
