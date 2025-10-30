import axios from "axios"
import AlertComp from "../components/common/AlertComp"


export default (setError,setLoading,form,setsignupVisibility,database,id1) => {
    
    const User = async (res) => {
        const user = await database.get('userdata').find("1")
        user.updateUser(form.email.trim(),form.phonenumber.trim())
    }
    const params = JSON.stringify({
        email:form.email,
        phonenumber:form.phonenumber,
        id:id1
    })
    
    axios.post('https://poscholars.com/api/animalgame/activation/updateuser.php',params,{
        method: 'POST',
        headers: {
            'Accept':'applicaton/json',
            'Content-Type':'application/json'
        },
        timeout:10000,
    }
    ).then((res) => {
        const response = res.data
        
        if(!response[0].error){
            setLoading(false)
            setsignupVisibility(false)
            User(response)
            AlertComp("Success","Account Successfully updated, you can proceed to make payment")
        }else{
            if(response[0].error.email){
                setLoading(false)
                setError((prev) => {
                    return {...prev, email: response[0].error.email};
                })
            }else if(response[0].error.phonenumber){
                setLoading(false)
                setError((prev) => {
                    return {...prev, phonenumber: response[0].error.phonenumber};
                })
            }else{
                setLoading(false)
                setsignupVisibility(false)
                AlertComp("An Error has occured: ",`${response[0].error.error}`)
            }
        }
    })
    .catch(e => {
        setLoading(false)
        AlertComp("An Error has occured: ",`${e}`)
    })
}