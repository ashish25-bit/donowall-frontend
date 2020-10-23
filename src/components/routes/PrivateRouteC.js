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
            loading ? (
                <Spinner />
            ) : isAuthenticated ? (
                <Component {...props} />
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
