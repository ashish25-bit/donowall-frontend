import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    UPDATE_PROFILE
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, 
    loading: true,
    user: null,
    typeToken: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                typeToken: payload.typeToken
            }
        
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            }
        
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                typeToken: null,
                isAuthenticated: false,
                loading: true
            }

        case UPDATE_PROFILE: 
            return {
                ...state,
                loading: true
            }
        
        default: 
            return state;

    }
}