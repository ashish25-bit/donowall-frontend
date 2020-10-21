import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRouteC = ({ 
    component: Component, 
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            loading ? (
                <h2>Loading...</h2>
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
