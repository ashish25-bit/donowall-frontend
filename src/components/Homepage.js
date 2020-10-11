import React,{useState} from 'react'
import Login from './user/Login'

export default function Homepage() {
    const[isOpen,setIsOpen]=useState(false)
    return (
        <div className='Homepage'>
            <button onClick={()=>setIsOpen(true)}>Login</button>
            <Login open={isOpen} onClose={()=> setIsOpen(false)}/>
            
        </div>
    )
}
