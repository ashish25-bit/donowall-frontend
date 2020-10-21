import api from '../utils/api';
import { json } from '../utils/headers';
import { getUserType, adminTypeToken } from '../utils/getUserType';
import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';

export const loadUser = () => async dispatch => {
    const data = localStorage.getItem('token');

    try {
        const { typeToken } = await getUserType(data);
        const endpoint = typeToken === adminTypeToken ? 
            "/admin/auth" : 
            "/user/auth";
        
        const res = await api.get(endpoint);
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
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

export const login = (formData, type) => async dispatch => {

    const endpoint = type === 'admin' ? '/admin/auth/login' : '/user/auth/login';
    const body = JSON.stringify(formData);

    try {
        const res = await api.post(endpoint, body, json);
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
        dispatch({ type: LOGIN_FAIL });
    }
}
