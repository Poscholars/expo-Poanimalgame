import React,{useState,useContext} from 'react'
import PaymentComp from '../../../components/PaymentComp'
import { GlobalContext } from '../../../context/Provider';
import genTransRef from '../../../utils/genTransRef';
import UpdateUser from '../../../helpers/UpdateUser';
import { useDatabase } from '@nozbe/watermelondb/hooks'
import AlertComp from '../../../components/common/AlertComp';
import { Platform,Linking, ToastAndroid } from 'react-native';
import axios from 'axios'
import getId from '../../../utils/getId';
import useInAppPurchase from '../../../helpers/UseInAppPurchase';
import { SHOW_PAYMENT, UPDATE_PAYMENT } from '../../../constants/actionTypes';




let i = 0
const PaymentComponent = () => {
    // IAPcomponent

    const [data,getData] = useState([])
    

    const { purchaseFullApp,Price} = useInAppPurchase({data});

    const [errors, setErrors] = useState({})
    const [error,setError] = useState({})
    const [loading,setLoading] = useState(false)
    const {
        authState: {visible,unlocked,loggedData},authDispatch
      } = useContext(GlobalContext);
    const database = useDatabase()
    const userData = database.collections.get('userdata')
    const [form, setForm] = useState({})
    const [visible2,setVisibility2] = useState(false)
    const [visible3,setVisibility3] = useState(false)
    const shouldshowbutton = loggedData[2][0]._raw.showbutton
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

    const [signupVisibility, setsignupVisibility] = useState(false)
 
       const EnterLink = async (data) => {
         await database.write(async () => {
            const comment = await database.get('whatsapp').find("1")
            await comment.update((coin) => {
                coin.link = data
            })
            })

    }
    ////clear and remove signup
    const removesignup = () => {
        setsignupVisibility(v => false)
        setErrors({})
        setForm({})
        setLoading(v => false)
    }
    
   // console.log(loggedData[0].school)
    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})
        if(value === ""){
            setErrors((prev)=>{
                return {...prev,[name]: 'This field is required'}
            })
        }else{
            setErrors((prev)=>{
                return {...prev,[name]: null}
            })
            setError((prev)=>{
                return {...prev,[name]: null}
            })
        }
        //clearAuthState()(authDispatch)
    }
    
    const onSubmit = async () => {
          if (!form.email) {
            setErrors((prev) => {
              return {...prev, email: 'Please add an email'};
            });
          }
          if (!form.phonenumber) {
            setErrors((prev) => {
              return {...prev, phonenumber: 'Please add a phone number'};
            });
          }
          if (Object.values(form).length === 2) {
               setLoading(true)
               const id = await getId()
               UpdateUser(setError,setLoading,form,setsignupVisibility,database,id[1])
            } 
    }

    //deactivateuser(loggedData)
    const showsignup = () => {
        setsignupVisibility(v => true)
    }
  
    const Openwhatsapp = () => {
        setVisibility2(v => true)
        axios.get('https://poscholars.com/api/animalgame/registration/getwhats.php',{
            method: 'GET',
            headers: {
                'Accept':'applicaton/json',
                'Content-Type':'application/json'
            },
            timeout:4000,
            })
            .then((res1)=>{
                const response1 = res1.data
                   // console.log('from internet')
                     EnterLink(response1)
                    Linking.openURL(response1).then((data) => {
                        setVisibility2(v => false)
                    }).catch((e) => {
                        setVisibility2(v => false)
                        AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                    });
            })
            .catch((err)=>{
                let url = loggedData[3].link;
                Linking.openURL(url).then((data) => {
                     setVisibility2(v => false)
                // console.log('WhatsApp Opened');
                }).catch((e) => {
                    setVisibility2(v => false)
                    AlertComp('An Error has occured','Make sure whatsapp is installed on your device')
                });

            })
    } 


    ////////// call purchase
    const Openchrome = async () => {
      if(shouldshowbutton == "false"){
        purchaseFullApp()
      }else{
        const userdata = await userData.query().fetch()
        const email = userdata[0]._raw.email
        const number = userdata[0]._raw.phone_number
        getData([email,number]) 
        
       
          if(number === null || email===null){
              if(Platform.OS === 'android'){
                  ToastAndroid.showWithGravity(
                      "You cannot proceed. Please sign up before continuing",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM
                    );
              }else{
                  AlertComp("IMPORTANT", "You cannot proceed. Please sign up before continuing",)
              }
          }else{
             purchaseFullApp()
          }
      }
    }
  
   
    return (
     <PaymentComp 
        onChange={onChange} 
        signupVisibility={signupVisibility}
        setsignupVisibility={removesignup}
        showsignup={showsignup}
        error={error}
        errors={errors}
        loading={loading}
        onSubmit={onSubmit}
        visible3={visible3}
        visible2={visible2}
        setVisibility3={setVisibility3}
        Openwhatsapp={Openwhatsapp}
        Openchrome={Openchrome}
        shouldshowbutton={shouldshowbutton}
        visible={visible}
        setVisibility={setVisibility}
        unlocked={unlocked}
        Price={Price}
    />
    )
}

export default PaymentComponent
