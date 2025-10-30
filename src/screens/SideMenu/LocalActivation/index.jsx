import React,{useState,useContext} from 'react'
import LocalActComp from '../../../components/LocalActivation'
import { GlobalContext } from '../../../context/Provider'
import UnlockUser from '../../../utils/UnlockUser';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import axios from 'axios'
import genTransRef from '../../../utils/genTransRef';
import AlertComp from '../../../components/common/AlertComp';
import { useNavigation } from '@react-navigation/core'
import { PAYMENT_COMP } from '../../../constants/routeNames';
import getId from '../../../utils/getId';
import { SHOW_PAYMENT, UPDATE_PAYMENT } from '../../../constants/actionTypes';

const LocalActivation = ({visible5,setVisibility5}) => {
    const {navigate} = useNavigation()
    const {
        authState: {visible,unlocked},authDispatch
      } = useContext(GlobalContext);

    
  
    const database = useDatabase()
    const userData = database.collections.get('userdata')
   //clearAuthState()(authDispatch)
    
    const setVisibility = () => {
        authDispatch({
            type:SHOW_PAYMENT,
            payload:false
        })
        authDispatch({
            type:UPDATE_PAYMENT,
            payload:false
        })
    }
  

    const onActivate = async () => {
        setVisibility5(false)
        const userdata = await userData.query().fetch()
        const email = userdata[0]._raw.email
        const number = userdata[0]._raw.phone_number
        const id = genTransRef(10)
        if(number === null || email === null){
            const signup = () => {
                navigate(PAYMENT_COMP)
            }
            AlertComp("Sign Up","You cannot proceed. Please ensure you sign up before activating the app",signup)
            setVisibility(v => false)  
        }else{
            authDispatch({
                type:SHOW_PAYMENT,
                payload:true
            })
            const id = await getId()
            const params = JSON.stringify({
                email:email,
                phoneNumber:number,
                id:id
            })
       
            axios.post('https://poscholars.com/api/animalgame/getinfo/unlock.php',params,{
                method: 'POST',
                headers: {
                    'Accept':'applicaton/json',
                    'Content-Type':'application/json'
                },
                timeout:10000,
            }
            ).then((res) => {
                const response = res.data
                const key = response[0].key
               // console.log(response)
                if(!response[0].error){
                    UnlockUser(database,key,authDispatch,"")
                }else{
                    AlertComp("An Error has occured: ",`${response[0].error.error}`)
                    authDispatch({
                        type:SHOW_PAYMENT,
                        payload:false
                    })
                }
            })
            .catch(e => {
                AlertComp("An Error has occured: ",`${e}`)
                authDispatch({
                    type:SHOW_PAYMENT,
                    payload:false
                })
            })
           
        }

    }
    return (
        <LocalActComp 
          
            visible={visible}
            setVisibility={setVisibility}
            unlocked={unlocked}
            visible5={visible5}
            setVisibility5={setVisibility5}
            onActivate={onActivate}
            />
    )
}

export default LocalActivation
