import api from '../utils/api';
import { json, multipart } from '../utils/headers';
import { getUserType, adminTypeToken } from '../utils/getUserType';
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    UPDATE_PROFILE,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import url from '../utils/url';

export const loadUser = () => async dispatch => {
    const data = localStorage.getItem('token');

    if (data) {
        try {
            const { typeToken } = await getUserType(data);
            const endpoint = typeToken === adminTypeToken ? 
                "/admin/auth" : 
                "/user/auth";
            
            const res = await api.get(endpoint);
            
            dispatch({
                type: USER_LOADED,
                payload: { user: res.data, typeToken }
            });
            console.log(res.data);
        }
        catch (err) {
            console.log(err.message);
            dispatch({
                type: AUTH_ERROR
            });
        }
    }
    else
        dispatch({ type: LOGOUT });
}

export const login = (formData, type) => async dispatch => {

    const endpoint = type === 'admin' ? '/admin/auth/login' : '/user/auth/login';
    const body = JSON.stringify(formData);

    try {
        const res = await api.post(endpoint, body, json);
        console.log(res.data);
        
        const { typeToken } = await getUserType(res.data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...res.data, typeToken }
        });
        
        dispatch(loadUser());
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        else 
            console.log(err.message);
        dispatch({ type: LOGIN_FAIL });
    }
}

// signup user or admin
export const signup = (formData, type) => async dispatch => {
    const endpoint = type === 'admin' ? '/admin/users' : '/user/users';
    const body = JSON.stringify(formData);

    try {
        const res = await api.post(endpoint, body, json);
        console.log(res.data);

        const { typeToken } = await getUserType(res.data.token);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: { ...res.data, typeToken }
        });
        
        dispatch(loadUser());
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        else 
            console.log(err.message);
        dispatch({ type: REGISTER_FAIL });
    }
}

// logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}

export const updateProfile = (formData, history, type) => async dispatch => {
    try {
        const endpoint = type === "user" ? '/user/profile/edit' : '/admin/profile/edit';
        const redirectURI = type === "user" ? url.userProfile : url.adminProfile;

        const res = await api.put(endpoint, formData, json);
        console.log(res);

        history.push(redirectURI);
        dispatch({ type: UPDATE_PROFILE });
        dispatch(loadUser());
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        else 
            console.log(err.message);
        return err;
    }
}

// add/replace admin profile image
export const changeImage = formData => async dispatch => {
    try {
        const res = await api.post('/admin/profile/photo', formData, multipart);
        console.log(res.data);
        
        dispatch({ type: UPDATE_PROFILE });
        dispatch(loadUser());
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        else 
            console.log(err.message);
    }
};

export const changeBloodData = data => async dispatch => {
    try {
        const res = await api.put('/admin/profile/editblood', {data: data}, json);
        console.log(res.data);

        dispatch({ type: UPDATE_PROFILE });
        dispatch(loadUser());
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        else 
            console.log(err.message);
    }
}

export const changeAcceptingStatus = () => async dispatch => {
    try {
        await api.put('/admin/profile/change/accepting/status');
        dispatch(loadUser());

        const present = await api.get('/admin/slot');

        if (present.data)
            return present.data
        
        // if data is not already present add the dummy data
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const body = days.map(day => { return { day, time: [["12PM", "2PM"]] } });

        const res = await api.post('/admin/slot/update', JSON.stringify(body), json);

        return res.data;
    }
    catch (err) {
        if (err.response !== undefined)
            console.log(err.response.data);
        console.log(err.message);
        return 500;
    }
}

export const bookingDone = history => dispatch => {
    dispatch({ type: UPDATE_PROFILE });
    dispatch(loadUser());
    history.push(url.homeUser);
}
