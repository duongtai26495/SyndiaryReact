import { 
    GET_DIARIES, 
    SORT_DIARY,
    UPDATE_LOGIN_STATE, 
    UPDATE_SHOW_MENU_BAR, 
    SORT_LAST_EDITED_DESC} from "./constants";
    
const initState = {
    userLoginState: false,
    leftMenuBar: false,
    diaries:[],
    sort: SORT_LAST_EDITED_DESC
}


function reducer(state, action) {
    switch (action.type) {
        case UPDATE_LOGIN_STATE:
            return {
                userLoginState: action.payload
            }
        case UPDATE_SHOW_MENU_BAR:
            return {
                leftMenuBar: action.payload
            }
        case GET_DIARIES:
            return {
                ...state.diaries,
                diaries: [...state.diaries,action.payload]
            }
        case SORT_DIARY:
            return {
                sort: action.payload
            }
        default:
            throw new Error('Sai action')
    }

}

export { initState };
export default reducer;