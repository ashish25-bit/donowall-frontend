import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { adminTypeToken } from '../../utils/getUserType';

const AuthRoute = ({
    component: Component,
    auth: { isAuthenticated, typeToken },
    ...rest
}) => {
    const redirect = typeToken === adminTypeToken ? '/admin/home' : '/user/home';
    
    return (
        <Route 
            {...rest}
            render={props => 
                localStorage.getItem('token') === null ? (
                    <Component {...props} /> 
                ) : !isAuthenticated ? (
                    <h2>Loading...</h2>
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