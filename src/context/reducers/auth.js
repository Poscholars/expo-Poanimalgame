import {  
    REGISTER_SUCCESS,  
    LOGGED_IN,
    UPDATE_USER,
    UPDATE_UI,
    UPDATE_THEME,
    UPDATE_ANIMALSLEARNT,
    REGISTER_SOUND,
    UPDATE_SOUND,
    UPDATE_GAMEDATA,
    UPDATE_PAYMENT,
    SHOW_PAYMENT} 
    from "../../constants/actionTypes"

const auth = (state, {type,payload}) => {


switch (type){
    case REGISTER_SUCCESS :
        return {...state,isLoggedIn:true}
    case LOGGED_IN :
        return {...state,loading:false, loggedData:payload}
    case UPDATE_USER :
        return {...state, isPremium:true}
    case UPDATE_UI :
        return {...state,updateui:payload}
    case UPDATE_THEME:
        return {...state,isDarktheme:payload}
    case UPDATE_ANIMALSLEARNT:
        return {...state,totalAnimalsLearnt:payload}
    case REGISTER_SOUND:
        return {...state,sound:payload}
    case UPDATE_SOUND:
        return {...state,shouldplay:payload}
    case UPDATE_GAMEDATA:
        return {...state,updatedata:payload}
    case UPDATE_PAYMENT:
        return {...state,unlocked:payload}
    case SHOW_PAYMENT:
        return {...state,visible:payload}
    default:
        return state
}

}

export default auth