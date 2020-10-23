import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { userTypeToken, adminTypeToken } from '../utils/getUserType';

const Homepage = ({ typeToken }) => {
    
    return (
        <div>
            { userTypeToken === typeToken && <h1>User Is Logged In</h1> }
            { adminTypeToken === typeToken && <h1>Admin Is Logged In</h1> }
        </div>
    )
}

Homepage.propType = {
    typeToken: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    typeToken: state.auth.typeToken
})

export default connect(mapStateToProps, {})(Homepage)
