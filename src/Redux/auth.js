import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isAuthenticated: localStorage.getItem('vbtoken') ? true : false,
    token: localStorage.getItem('vbtoken'),
    user: localStorage.getItem('cred') ? JSON.parse(localStorage.getItem('cred')) : null,
    errMessage: null
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_REQUEST:
            return {...state, isAuthenticated: false, user: action.creds};
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, token: action.token, errMessage: ''};
        case ActionTypes.LOGIN_FAILED:
            return {...state, isAuthenticated: false, errMessage: action.message};
        default:
            return state;
    }

}
