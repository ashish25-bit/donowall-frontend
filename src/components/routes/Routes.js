import React from 'react';
import { Switch } from 'react-router-dom';
import Main from '../Main'
import HomePage from '../HomePage';
import PrivateRouteC from './PrivateRouteC';
import AuthRoute from './AuthRoute';

const Routes = () => {
    return (
        <div>
            <Switch>
                <AuthRoute exact path='/' component={Main} />
                <PrivateRouteC exact path='/home' component={HomePage} />
            </Switch>
        </div>
    )
}

export default Routes
