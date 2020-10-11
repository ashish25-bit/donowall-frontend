import React from 'react';
import api from '../../utils/api';
import { json } from '../../utils/headers';

const Login = () => {

    const clickHandler = async () => {
        try {
            const data = {
                email : "ashishyoel23@gmail.com",
                password: "123456"
            }
            const res = await api.post('/admin/users', data, json);
            console.log(res.data);            
        } 
        catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div>
            <h1>Admin Login</h1>
            <button onClick={clickHandler}>Login</button>
        </div>
    )
}

export default Login
