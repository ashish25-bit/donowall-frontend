import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userTypeToken } from '../../utils/getUserType';
import NotFound from '../layouts/NotFound';
import Spinner from '../layouts/Spinner';

const UserPrivateRoute = ({
    component: Component, 
    auth: { isAuthenticated, loading, typeToken },
    ...rest
}) => {
    const status = loading || typeToken === userTypeToken ? true : false;

    if (!status)
        return <NotFound />

    return (
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
}

UserPrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(UserPrivateRoute)