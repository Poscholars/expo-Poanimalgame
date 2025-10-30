import React, {useContext,useEffect,useState} from 'react'
import InitialPageComp from '../../components/InitialPageComp'
import getId from '../../utils/getId';
import { useNavigation } from '@react-navigation/native';
import { INITIAL_YES } from '../../constants/routeNames';
import storeDataonline from '../../helpers/storeDataonline';
import { useDatabase } from '@nozbe/watermelondb/hooks';

const InitialPage = () => {
  const database = useDatabase()
  const {navigate} = useNavigation()
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [showModal,setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const RightOnpress = () => {
    setShowModal(v => false)
  }

  const Yesonpress = () => {
    navigate(INITIAL_YES,{type:"yes"})
  }

  const Noonpress = () => {
    navigate(INITIAL_YES,{type:"no"})
  }

  const onSubmit = async (func) => {
    if(name == ""){
      setError(v => "Username is required")
    }else{
      const id = await getId()
      setLoading(v => true)
      storeDataonline(name,id[1],database,setShowModal,setError,setLoading,func)
    }
  }

  const onSubmitYes = () => {
    onSubmit(Yesonpress)
  }

  const onSubmitNo = () => {
    onSubmit(Noonpress)
  }

  const onChangeText=(value)=>{
    setError(v => "")
    setName( v => value)
    }

  
  return (
   <InitialPageComp 
    onChangeText={onChangeText} 
    error={error} 
    onSubmitYes={onSubmitYes}
    onSubmitNo={onSubmitNo} 
    showModal={showModal}
    RightOnpress={RightOnpress}
    name={name}
    loading={loading}
    />
  )
}

export default InitialPage