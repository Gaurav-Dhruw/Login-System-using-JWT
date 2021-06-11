import React, { useEffect, useState, Fragment } from 'react';
import Fade from "react-reveal/Fade"


import Cookies from "universal-cookie";
import { Redirect, useHistory } from 'react-router';
import Navbar from './Navbar';
import axios from 'axios';

function Account() {
    const [data, setData] = useState({})
    const [loginStatus, setLoginStatus] = useState({ login: true });
    const [loading, setLoading] = useState(false);
    const [fade, setShow] = useState({showP:false, showD:false, showA:true});

    const cookie = new Cookies();
    const history = useHistory();
    useEffect(() => {
        if (cookie.get("refresh_token")) {
            return setLoginStatus({ login: true })
        }


        // history.push("/login")

    }, [])

    const handleInput = (e) => {
        setData({ ...data, password: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("/api/account/password/change", { password: data.password })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const getUserData = () => {
        axios.get("/api/account")
            .then(res => {
                console.log(res)
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleFade=(e)=>{
        // e.preventDefault();
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
            {console.log(fade,"fade")}
            {loginStatus.login ?

                <Fragment><Navbar />



                    <section className="account">
                        <div className="account-header">
                            <h2>Settings</h2>
                        </div>

                        <div className="display">
                            <div className="btn-container">

                                <button onClick={()=>{getUserData();handleFade()}} name="showA"type="button" class="btn btn-light">Account Details</button>


                                <button type="button" name="showP" onClick={handleFade} class="btn btn-light">
                                    Change Password
                </button>
                                <button type="button" name="showD" onClick={handleFade} class="btn btn-light">
                                    Delete Account
                </button>
                            </div>
                            <div className="display-area">
                                <Fade when={fade.showP} duration={500} >

                                    <form className="password-form" >
                                        <input type="text" placeholder="Enter new password" onChange={handleInput} />
                                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Change Passowrd</button>
                                    </form>
                                </Fade>
                                <Fade when={fade.showA} duration={500}>
                                    <div className="account-container">
                                        {loading ? <div class="d-flex justify-content-center">
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </div> : <div className="account-details">
                                            <p>User: {data.user_nampe}</p>
                                            <p>Email: {data.email}</p>
                                        </div>}

                                    </div>
                                </Fade>
                                <Fade when={fade.showD} duration={500}>
                                    <div className="delete-container">
                                    <button type="button" onClick={handleFade} class="btn btn-danger">Confirm Delete</button>

                                    </div>
                                </Fade>
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
