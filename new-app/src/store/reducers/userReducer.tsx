import * as Types from "../types/types";

interface IUserState {
    currUser: any,
    chatsList: any,
    chosenChat: any,
    isMenuOpen: any,
    isCreateChatOpen: any,
    errorLogin:any,
}

export const userInitState = {
    currUser: null,
    chatsList: [],
    chosenChat: null,
    isMenuOpen: false,
    isCreateChatOpen: false,
    errorLogin:false
};

const userReducer = (
    state: IUserState = userInitState,
    action: { type: String; payload?: any }
) => {
    switch (action.type) {
        case Types.SET_CURR_USER:
            return {
                ...state,
                currUser: action.payload
            };
        case Types.SET_CHOSEN_CHAT:
            return {
                ...state,
                chosenChat: action.payload
            };
        case Types.SET_MENU_TOGGLE:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            };
        case Types.SET_CREATE_CHAT_TOGGLE:
            return {
                ...state,
                isCreateChatOpen: !state.isCreateChatOpen
            };
        case Types.SET_ERROR_LOGIN:
            return {
                ...state,
                errorLogin: action.payload
            };
        case Types.SET_CHATS_LIST:
            return {
                ...state,
                chatsList: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
