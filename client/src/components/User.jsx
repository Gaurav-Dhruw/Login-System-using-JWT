    import React, {useEffect, useState, Fragment} from 'react';

function User(props) {
// const [loginStatus,setLoginStatus]= useState({loading:true, login:false})
    

    return (
        <Fragment>
            {props.loginStatus? <div>Authorized</div>:<div>Unathorized</div>}
        </Fragment>
    )
}

export default User
