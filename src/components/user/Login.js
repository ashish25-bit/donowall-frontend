import React from 'react'
import axios from 'axios'
import ReactDom from 'react-dom'

export default function Login({open,onClose}) {

    if(!open) {
    return null}
    return ReactDom.createPortal(<>
        <div className="overlay"></div>
        <div className="login-form">
        <div className="close">
        <svg onClick={onClose}width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </div>
        <h4>Login</h4>
        <form>
            <div class="form-group">
                
    <label for="email">Email address</label>
    <span>
    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
</svg>
</span>
    <input type="text" class="form-control"  aria-describedby="emailHelp"/>
    
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone.</small>
    </div>
    <div class="form-group">
    <label for="pwd">Password</label>
    <span>
    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
  <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
</svg>
</span>
    <input type="password" class="form-control" />
    
        </div>
        <div className="d-flex justify-content-center">
        <button className='btn login-btn'>Login</button>
        </div>
        <div className="d-flex justify-content-center">
        <button className='btn login-btn'>Register</button>
        </div>
        </form>
        </div>
        
        </>,
        document.getElementById('login')

    );
}