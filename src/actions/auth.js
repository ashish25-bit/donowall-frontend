import api from '../utils/api';
import { json } from '../utils/headers';
import { getUserType, adminTypeToken } from '../utils/getUserType';
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    UPDATE_PROFILE
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
        console.log(err);
        dispatch({ type: LOGIN_FAIL });
    }
}

// logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}

export const updateProfile = (formData, history, type) => async dispatch => {
    try {
        const res = await api.put('/user/profile/edit', formData, json);
        console.log(res);

        const redirectURI = type === "user" ? url.userProfile : url.homeAdmin;
        history.push(redirectURI);
        dispatch({ type: UPDATE_PROFILE });
        dispatch(loadUser());
    }
    catch (err) {
        console.log(err.response.data);
        return err;
    }
}
