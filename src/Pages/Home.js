import React from "react";
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <Link to = {{pathname: '/login'}} > <button>Account Login</button></Link>
            {' '}
            <Link to = {{pathname: '/register'}} > <button>Create Account</button></Link>
        </div>
    )
}

export default Home
