import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { adminTypeToken } from '../../utils/getUserType';
import NotFound from '../NotFound';

const AdminPrivateRoute = ({
    component: Component, 
    auth: { isAuthenticated, loading, typeToken },
    ...rest
}) => {
    const status = typeToken === adminTypeToken ? true : false;

    if (!status)
        return <NotFound />

    return (
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
}

AdminPrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(AdminPrivateRoute)
