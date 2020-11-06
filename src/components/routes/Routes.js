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
import AdminProfile from '../admin/Profile';
import AdminProfileEdit from '../admin/ProfileEdit';
import EditBloodData from '../admin/EditBloodData';
import EditImage from '../admin/EditImage';
import NotFound from '../layouts/NotFound';
import ShowHospital from '../user/ShowHospital';
import ChangeTimeSlots from '../admin/ChangeTimeSlots';
import BookAppointment from '../user/BookAppointment';
import UserAppointment from '../admin/User';
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
                <UserPrivateRoute exact path={`${url.showHospital}/:id`} component={ShowHospital}/>
                <UserPrivateRoute exact path={`${url.bookAppointment}/:id`} component={BookAppointment} />
                <AdminPrivateRoute exact path={url.adminProfile} component={AdminProfile} />
                <AdminPrivateRoute exact path={url.adminProfileEdit} component={AdminProfileEdit} />
                <AdminPrivateRoute exact path={url.editBloodData} component={EditBloodData} />
                <AdminPrivateRoute exact path={url.changeTimeSlot} component={ChangeTimeSlots} />
                <AdminPrivateRoute exact path={url.editImage} component={EditImage} />
                <AdminPrivateRoute eaxt path={`${url.userAppointment}/:id`} component={UserAppointment} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes
