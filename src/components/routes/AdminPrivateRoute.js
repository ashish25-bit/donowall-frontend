import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { adminTypeToken } from '../../utils/getUserType';
import NotFound from '../layouts/NotFound';
import Spinner from '../layouts/Spinner';
import EditBloodData from '../admin/EditBloodData';
import EditImage from '../admin/EditImage';

const AdminPrivateRoute = ({
    component: Component, 
    auth: { isAuthenticated, loading, typeToken, user },
    ...rest
}) => {
    const status = loading || typeToken === adminTypeToken ? true : false;

    if (!status)
        return <NotFound />

    return (
        <Route
            {...rest}
            render={props =>
                loading && localStorage.getItem('token') !== null ? (
                    <Spinner />
                ) : isAuthenticated ? (
                    user.blood_data.length === 0 || user.image === null ? (
                        user.image === null ? (
                            <div className='main-container'>
                                <EditImage />
                            </div>
                        ) : (
                            <div className='main-container'>
                                <EditBloodData />
                            </div>
                        )
                    ) : (
                        <div className='main-container'>
                            <Component {...props} />
                        </div>
                    )
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
