import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adminTypeToken, userTypeToken } from '../../utils/getUserType';

function NotFound({ typeToken }) {

    let redirectURI;
    if (adminTypeToken === typeToken)
        redirectURI = '/admin/home';
    else if (userTypeToken === typeToken)
        redirectURI = '/user/home';
    else 
        redirectURI = '/';

    return (
        <div className='main-container'>
            <h1>Page No Found</h1>
            <Link to={redirectURI}>Go To Home Page</Link>
        </div>
    )
}

NotFound.typeToken = {
    typeToken: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    typeToken: state.auth.typeToken
})

export default connect(mapStateToProps, {})(NotFound);
