import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isAuthenticated: localStorage.getItem('vbtoken') ? true : false,
    token: localStorage.getItem('vbtoken'),
    isLoading: false,   
    username: localStorage.getItem('un') ? localStorage.getItem('un') : null,
    errMessage: null
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_REQUEST:
            return {...state, isAuthenticated: false, isLoading: true, username: action.creds};
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, token: action.token, errMessage: null, isLoading: false, username: action.username};
        case ActionTypes.LOGIN_FAILED:
            return {...state, isAuthenticated: false, isLoading: false, errMessage: action.message};
        case ActionTypes.LOGOUT_REQUEST:
            return {...state, isAuthenticated: true};
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state, isAuthenticated: false, token: '', user: null, errMessage: null};
        default:
            return state;
    }

}
