import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layouts/Spinner';

const PrivateRouteC = ({ 
    component: Component, 
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            loading && localStorage.getItem('token') !== null ? (
                <Spinner />
            ) : isAuthenticated ? (
                <div className='main-container'>
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to='/' />
            )
        }
    />
)

PrivateRouteC.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRouteC)
