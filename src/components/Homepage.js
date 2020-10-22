import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { logout } from '../actions/auth';
import { userTypeToken } from '../utils/getUserType';
import { Link } from 'react-router-dom';

const HomePage = ({ logout, typeToken }) => {
    
    return (
        <div>
            <h1>Home Page</h1>
            <Link to='/' onClick={logout}>Logout</Link>
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
