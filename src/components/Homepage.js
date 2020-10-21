import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { logout } from '../actions/auth';
import { userTypeToken } from '../utils/getUserType';

const HomePage = ({ logout, typeToken }) => {
    
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
            { 
                userTypeToken === typeToken ?  
                    <h1>User Is Logged In</h1> : 
                    <h1>Admin Is Logged In</h1>
            }
        </div>
    )
}

HomePage.propType = {
    logout: PropTypes.func.isRequired,
    typeToken: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    typeToken: state.auth.typeToken
})

export default connect(mapStateToProps, { logout })(HomePage)
