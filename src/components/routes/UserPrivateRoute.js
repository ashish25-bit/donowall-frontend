import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userTypeToken } from '../../utils/getUserType';
import NotFound from '../NotFound';

const UserPrivateRoute = ({
    component: Component, 
    auth: { isAuthenticated, loading, typeToken },
    ...rest
}) => {
    const status = typeToken === userTypeToken ? true : false;

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

UserPrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(UserPrivateRoute)