import {ThunkDispatch} from "redux-thunk";
import * as Types from "../types/types";
import userService from '../../services/userService'


export const signUpUser = (currUser: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            currUser = await userService.signUp(currUser);
            dispatch({
                type: Types.SET_CURR_USER,
                payload: currUser
            });
            dispatch({
                type: Types.SET_ERROR_LOGIN,
                payload: false
            });
        } catch (e) {
            dispatch({
                type: Types.SET_ERROR_LOGIN,
                payload: true
            });
        }
    };
};

export const logInUser = (currUser: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            currUser = await userService.logIn(currUser);
            dispatch({
                type: Types.SET_CURR_USER,
                payload: currUser
            });
            dispatch({
                type: Types.SET_ERROR_LOGIN,
                payload: false
            });
        } catch (err) {
            dispatch({
                type: Types.SET_ERROR_LOGIN,
                payload: true
            });
        }
    };
};

export const setCurrUserFromStorage = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        let currUser = userService.getLoggedinUser();
        dispatch({
            type: Types.SET_CURR_USER,
            payload: currUser
        });
    };
};

export const updateCurrUserFromStorage = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        let currUser = await userService.updateUser();
        dispatch({
            type: Types.SET_CURR_USER,
            payload: currUser
        });
    };
};

export const setErrorLogin = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch({
            type: Types.SET_ERROR_LOGIN,
            payload: false
        });
    };
};

export const logOut = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        await userService.logOut();
        dispatch({
            type: Types.SET_CURR_USER,
            payload: null
        });
    };
};

export const setChosenChat = (chat: any) => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch({
            type: Types.SET_CHOSEN_CHAT,
            payload: chat
        });
    };
};

export const setMenuToggle = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch({
            type: Types.SET_MENU_TOGGLE
        });
    };
};

export const setCreateNewChatModalToggle = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch({
            type: Types.SET_CREATE_CHAT_TOGGLE
        });
    };
};


export const setChatsList = () => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        let chats = await userService.loadChats();
        dispatch({
            type: Types.SET_CHATS_LIST,
            payload: chats
        });
    };
};



