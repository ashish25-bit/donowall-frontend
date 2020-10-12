import React,{useState} from 'react';
import LoginUser from './user/Login';
import LoginAdmin from './admin/Login';

const Homepage = () => {
    const [currentForm, setCurrentForm]= useState(-1);

    return (
        <div className='Homepage'>
            <button onClick={()=>setCurrentForm(1)}>Login User</button>
            <button onClick={()=>setCurrentForm(2)}>Login Admin</button>
            { currentForm === 1 && <LoginUser onClose={()=> setCurrentForm(-1)}/> }
            { currentForm === 2 && <LoginAdmin onClose={()=> setCurrentForm(-1)}/> }
        </div>
    )
}

export default Homepage;
