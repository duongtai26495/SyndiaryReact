import { 
    GET_DIARIES, 
    SORT_DIARY,
    UPDATE_LOGIN_STATE, 
    UPDATE_SHOW_MENU_BAR, 
    SORT_LAST_EDITED_DESC,
    UPDATE_USER_INFO} from "./constants";
    
const initState = {
    userLoginState: false,
    leftMenuBar: false,
    diaries:[],
    sort: SORT_LAST_EDITED_DESC,
    updateUserInfo:false
}


function reducer(state, action) {
    switch (action.type) {
        case UPDATE_LOGIN_STATE:
            return {
                ...state.userLoginState,
                userLoginState: action.payload
            }
        case UPDATE_SHOW_MENU_BAR:
            return {
                ...state.leftMenuBar,
                leftMenuBar: action.payload
            }
        case GET_DIARIES:
            return {
                ...state.diaries,
                diaries: [...state.diaries,action.payload]
            }
        case SORT_DIARY:
            return {
                ...state.diaries,
                sort: action.payload
            }
        case UPDATE_USER_INFO:
            return {
                ...state.updateUserInfo,
                updateUserInfo: action.payload
            }
        default:
            throw new Error('Sai action')
    }

}

export { initState };
export default reducer;