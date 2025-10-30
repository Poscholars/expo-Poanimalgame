
import {  UPDATE_PAYMENT, UPDATE_UI, UPDATE_USER } from "../constants/actionTypes"
import { CHECK_COIN } from "../constants/routeNames";




export default (database,key,authDispatch,token,navigate) => {

    const writekey = async () => {
        const updatekey = await database.get('userkey').find("1")
        updatekey.updateKey(key,token)
        }
    writekey()
    authDispatch({
        type:UPDATE_PAYMENT,
        payload:true
    })
    authDispatch({
        type:UPDATE_USER,
    })
    authDispatch({
        type:UPDATE_UI,
        payload: Math.floor((Math.random() * 1000) + 1)
    })
   
    if(navigate){
        navigate(CHECK_COIN)
    }

       
}