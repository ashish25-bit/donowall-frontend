import React from 'react'
import { Link } from 'react-router-dom'

function Headers() {
    return (
        <div>
            <Link to='/admin/login'>Admin Login</Link> <br />
            <Link to='/admin/signup'>Admin Signup</Link> <br />
            <Link to='/user/login'>User Login</Link> <br />
            <Link to='/user/signup'>User Signup</Link> <br />
        </div>
    )
}

export default Headers
