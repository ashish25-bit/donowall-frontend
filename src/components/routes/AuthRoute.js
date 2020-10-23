import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { adminTypeToken, userTypeToken } from '../../utils/getUserType';
import Spinner from '../layouts/Spinner';

const AuthRoute = ({
    component: Component,
    auth: { isAuthenticated, typeToken },
    ...rest
}) => {
    let redirect = '/';
    
    if (typeToken === adminTypeToken)
        redirect = '/admin/home';
    
    if (typeToken === userTypeToken)
        redirect = '/user/home';

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