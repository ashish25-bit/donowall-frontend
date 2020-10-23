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
import NotFound from '../layouts/NotFound';

const Routes = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path='/' component={Main} />
                <PrivateRouteC exact path='/home' component={Homepage} />
                <AdminPrivateRoute exact path='/admin/home' component={AdminHome} />
                <UserPrivateRoute exact path='/user/home' component={UserHome} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes
