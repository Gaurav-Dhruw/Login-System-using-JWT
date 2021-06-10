import React, {useEffect, useState, Fragment} from 'react';
import Loading from "./Loading"
import User from "./User"

import Cookies from "universal-cookie"

function Account() {

    const [loginStatus,setLoginStatus]= useState({loading:true, login:false})
    const cookie = new Cookies;
    useEffect(() => {
        if(cookie.get("refresh_token")){
            return setLoginStatus({loading:false, login:true})
        }

        setLoginStatus({...loginStatus,loading:false})

    }, [])
    return (
        <Fragment>
            {loginStatus.loading? <Loading></Loading>:<User loginStatus={loginStatus.login}></User>
            }

        </Fragment>
    
    )
}

export default Account
