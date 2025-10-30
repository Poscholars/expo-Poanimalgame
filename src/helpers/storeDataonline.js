import axios from 'axios';
import initializeGame from '../utils/initializeGame';
import { Platform } from 'react-native';
import genTransRef from '../utils/genTransRef';
import env from '../config/env'

export default async (name,id,database,setShowModal,setError,setLoading,func)=>{
    initializeGame(database)
  
    const EnterData = async (data) => {
        const getuserdata = await database.write(async writer => {
            await writer.batch(
            database.collections.get('userdata').prepareCreate(user => {
                user._raw.id = "1"
                user.userName = data.username
                user.idc = 1
            }),
            database.collections.get('coin').prepareCreate(coina => {
                coina._raw.id = "1"
                coina.coinAmount = parseInt(data.point)
                coina.idc = 1
            }),
            database.collections.get('userkey').prepareCreate(userk => {
                userk._raw.id = "1"
                userk.showbutton = data.show
                userk.idc = 1
            })
            )
        })
    }

    const EnterLink = async (data) => {
         const getuserdata = await database.write(async writer => {
            await writer.batch(
            database.collections.get('whatsapp').prepareCreate(user => {
                user._raw.id = "1"
                user.idc = 1
                user.link = data.whatsapp
            }))
           func()
           setLoading(v => false)
        })

    }
    const params = JSON.stringify({
        Username:name,
        KeyId:id,
        device:Platform.OS,
        Email:"user@email.com",
        token:genTransRef(10)
    })
   
    const response = await axios.post(`${env.FETCH_URL}animalgameusers/animalgame/register`,params, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout:20000
    })
        const { data } = response;
        EnterData(data)
        EnterLink(data)
        setLoading(v => false)
       // setShowModal(v => true)
}