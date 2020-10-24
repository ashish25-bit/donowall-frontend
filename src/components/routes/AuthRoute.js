import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { adminTypeToken, userTypeToken } from '../../utils/getUserType';
import Spinner from '../layouts/Spinner';
import url from '../../utils/url';

const AuthRoute = ({
    component: Component,
    auth: { isAuthenticated, typeToken },
    ...rest
}) => {
    let redirect = url.authRoute;
    
    if (typeToken === adminTypeToken)
        redirect = url.homeAdmin;
    
    if (typeToken === userTypeToken)
        redirect = url.homeUser;

    return (
        <Route 
            {...rest}
            render={props => 
                localStorage.getItem('token') === null ? (
                    <Component {...props} /> 
                ) : !isAuthenticated ? (
                    <Spinner />
                ) : (
                    <Redirect to={redirect} />
                )
            }
        />
    )
}

AuthRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}) 

export default connect(mapStateToProps)(AuthRoute)