import {Alert} from 'react-native'
import axios from 'axios'
import UnlockUser from '../utils/UnlockUser'
import AlertComp from '../components/common/AlertComp'


export default (receipt,data,database,authDispatch,navigate) => {
    const params = {data:JSON.parse(receipt),email:data[0],number:data[1]}
    //Alert.alert("data",JSON.stringify(params))
    axios.post('https://poscholars.com/node/api/validate',params,{
            method:"POST",  
            header: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        .then(res=>{
            //Alert.alert("data",JSON.stringify(res.data))
            const response = res.data
          //  console.log(response)
            if(response.error == "0"){
                UnlockUser(database,response.data.key,authDispatch,response.token,navigate)
            }else{
                AlertComp("Error",response.error)
            }
           
        })   
        .catch(error=>{
            Alert.alert('Network Error','Please ensure you have active internet before continuing')
            // AlertComp("Network Error", `Please ensure you have active internet before continuing: ${error.Error}`)
            // setErrors(v => true)
        })
}