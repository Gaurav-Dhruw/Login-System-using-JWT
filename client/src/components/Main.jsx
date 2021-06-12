import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import {UserContext} from "../context/UserContextProvider";




const useConstructor=(callBack = () => {})=> {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }
function Main() {
    const cookies = new Cookies();
    const [user,setUser] = useContext(UserContext);


    useConstructor(()=>{

        if (cookies.get("refresh_token")) {
    
            return setUser({...user,loggedIn:true});
		}
        setUser({...user,loggedIn:false})

    })

    return (
        <section className="main-section">

            <div className="header">
                    <h1>Welcome to Login Manager</h1>
            </div>

            <div className="desc-cont">
                <p>This is a login/signup system, which also verifies the user's email before registeration.</p>
                
            </div>
            <div className="get-started">
                        {user.loggedIn?<Link to="/account"><button type="button" class="btn btn-primary">Go to Account</button></Link>:<div></div>}
            </div>
            

            
        </section>
    )
}

export default Main
