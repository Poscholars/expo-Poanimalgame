
import React,{useContext} from 'react'
import CheckCoinComp from '../../../components/CheckCoinComp'
import { useNavigation } from '@react-navigation/native'
import { PAYMENT_COMP } from '../../../constants/routeNames'
import { GlobalContext } from '../../../context/Provider'



const CheckCoin = () => {
  const{authState:{isPremium,loggedData}} = useContext(GlobalContext)
  const {navigate} = useNavigation()
  const gotopayment = () => {
    navigate(PAYMENT_COMP)
  }
  return (
    <CheckCoinComp gotopayment={gotopayment} isPremium={isPremium} loggedData={loggedData}/>
  )
}

export default CheckCoin