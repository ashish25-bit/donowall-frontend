import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main'
import Homepage from '../Homepage';
import AdminHome from '../admin/Home';
import UserHome from '../user/Home';
import PrivateRouteC from './PrivateRouteC';
import AuthRoute from './AuthRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import UserPrivateRoute from './UserPrivateRoute';
import UserProfile from '../user/Profile';
import UserProfileEdit from '../user/ProfileEdit';
import NotFound from '../layouts/NotFound';
import url from '../../utils/url';

const Routes = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path={url.authRoute} component={Main} />
                <PrivateRouteC exact path='/home' component={Homepage} />
                <AdminPrivateRoute exact path={url.homeAdmin} component={AdminHome} />
                <UserPrivateRoute exact path={url.homeUser} component={UserHome} />
                <UserPrivateRoute exact path={url.userProfile} component={UserProfile} />
                <UserPrivateRoute exact path={url.userProfileEdit} component={UserProfileEdit} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes
