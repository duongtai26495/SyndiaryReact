import { ADD_DIARY, GET_DIARIES, SORT_LAST_EDITED, UPDATE_LOGIN_STATE, UPDATE_SHOW_MENU_BAR } from "./constants";
const initState = {
    userLoginState: false,
    leftMenuBar: false,
    diaries:[],
    sort: SORT_LAST_EDITED
}


function reducer(state, action) {
    switch (action.type) {
        case UPDATE_LOGIN_STATE:
            return {
                ...state,
                userLoginState: action.payload
            }
        case UPDATE_SHOW_MENU_BAR:
            return {
                ...state,
                leftMenuBar: action.payload
            }
        case GET_DIARIES:
            return {
                ...state,
                diaries: [...state.diaries,action.payload]
            }
        case ADD_DIARY:
            return {
                ...state,
                diaries: [...state.diaries, action.payload]
            }
        default:
            throw new Error('Sai action')
    }

}

export { initState };
export default reducer;