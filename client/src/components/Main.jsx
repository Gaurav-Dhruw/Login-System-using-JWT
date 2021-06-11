import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

function Main() {
    const cookies = new Cookies();
    return (
        <section className="main-section">

            <div className="header">
                    <h1>Welcome to Lorem ipsum dolor sit.</h1>
            </div>

            <div className="desc-cont">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ipsam repudiandae animi non voluptate similique nobis, sed vel doloremque illum!</p>
                
            </div>
            <div className="get-started">
                        {cookies.get("refresh_token")?<Link to="/account"><button type="button" class="btn btn-primary">Go to Account</button></Link>:<div></div>}
            </div>
            

            
        </section>
    )
}

export default Main
