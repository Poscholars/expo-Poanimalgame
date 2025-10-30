import React from 'react'
import { View,SafeAreaView, Text, TouchableOpacity,ActivityIndicator} from 'react-native'
import styles from './styles'
import ModalComponent from '../common/Modal';
import Input from "../common/Input";
import CustomButton from '../common/CustomButton';
import Terms from '../../screens/SideMenu/Terms'
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import FImage from '../common/FImage';
import Header from '../common/Header';
import HeaderButton from '../common/HeaderButton';
import { BodyModal, UnlockModal } from '../common/UnlockModal';


const Image = ({image}) => {
    return <FImage source={image} style={styles.smallimage}/>
}

const InputBody = ({error,errors,onChange,onSubmit,loading}) => {
    const {colors,dark} = useTheme()

    return (
        <>
        <View style={styles.form}>
        <Input
            label="Email"
            style = {styles.input}
            placeholder="Enter your email here"
            icon={<Image image={dark ? require('../../assets/images/emaildark.webp')
            : require('../../assets/images/emaillight.webp')
            }/>}    
            iconPosition="left"
            error={errors.email || error?.email}
            onChangeText={(value)=>{
                onChange({name: 'email', value})
            }}
            keyboardType="email-address"
            maxLenght={35}
        />
        <Input
            label="Phone Number"
            placeholder="Enter your phone number here"
            icon={<Image image={dark ? require('../../assets/images/phonedark.webp')
            : require('../../assets/images/phonelight.webp')}/>}
            iconPosition="left"
            error={errors.phonenumber || error?.phonenumber}
            keyboardType="numeric"
            onChangeText={(value)=>{
                onChange({name: 'phonenumber', value:value.toString()})
            }}
            maxLenght={11}
        />
        <CustomButton 
                title="SUBMIT"
                primary
                onPress={onSubmit}
                disabled={loading}
                loading={loading}
            />
        </View>
        </>
    )
}


const PaymentComp = ({
    onChange,
    signupVisibility,
    setsignupVisibility,
    error,
    errors,
    loading,
    onSubmit,
    visible3,
    visible2,
    setVisibility3,
    Openwhatsapp,
    Openchrome,
    showsignup,
    shouldshowbutton,
    visible,
    setVisibility,
    unlocked,
    Price

}) => {
    const {colors} = useTheme()
   
    return (
        <>
        <SafeAreaView style={styles.container}>
            <Header 
                 LeftButton={"back"}  
                Title={"Payment Section"}
            />
            <View style={[styles.viewone,{borderColor:colors.green}]}>
                <Text style={styles.notice}>IMPORTANT NOTICE!!!</Text>
                <Text style={[styles.fwriteup,{color:colors.textcolor}]}>Before you activate this app, ensure you sign up below with the correct 
                <Text style={[styles.inner,{color:colors.textcolor}]}> E-mail and phone number</Text> you have access to.
              
                </Text>
                <Text style={[styles.fwriteup,{color:colors.textcolor}]}>We will use this information to reach you as a user. This is necessary for your purchase confirmation</Text>
                <TouchableOpacity style={[styles.signButton,{borderColor:colors.green}]}  onPressIn={showsignup}>
                    <Text style={[styles.signupb,{color:colors.green}]}>Sign Up</Text>
                </TouchableOpacity>
            
            </View>
            <View style={[styles.viewtwo,{borderColor:colors.green}]}>
                <Text style={[styles.text2,{color:colors.textcolor}]}>
                 {shouldshowbutton == "false" ? "Become a premium user by using GOOGLE PAYMENT system" : "Now, choose any convenient method below to become a premium user"}
                </Text>
                
                <TouchableOpacity style={[styles.fluButton,{backgroundColor:colors.green}]}
                    onPressIn={Openchrome}>
                    <Text style={styles.paytext}>PAY {Price} VIA GOOGLE PLAY</Text>
                </TouchableOpacity>
                 {shouldshowbutton == "true" && <Text style={{textAlign:"center",fontSize:moderateScale(12)}}>OR</Text>}
                {shouldshowbutton == "true" && <TouchableOpacity style={[styles.fluButton,{backgroundColor:colors.green}]}
                    onPressIn={Openwhatsapp}>
                    <Text style={styles.paytext}>PAY N1000 VIA BANK TRANSFER (NG)</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPressIn={()=>{ 
                    setVisibility3(true)
                }} style={styles.terms}>
                    <Text style={[styles.termstext,{color:colors.green,borderColor:colors.green}]}>Terms and Conditions</Text>
                </TouchableOpacity>
            
            
            </View>
        </SafeAreaView>
        <ModalComponent
            Title = "Sign up with Poscholars"
            visible={signupVisibility}
            setVisibility={setsignupVisibility}
            bodyComponent =  {<InputBody 
                                error={error}   
                                errors={errors} 
                                onChange={onChange} 
                                loading={loading}
                                onSubmit={onSubmit}
                                />}
            style={styles.modal}
        />
        <ModalComponent
            Title=""
            visible={visible2}
            bodyComponent={
                <ActivityIndicator size="large" color={colors.green}/>
            }
            style={{width:0}}
            />
        <Terms visible={visible3} setVisibility={setVisibility3} />
        <UnlockModal 
            Title = {unlocked ? "Unlock Successful" :"Unlocking App..."}
            visible={visible}
            setVisibility={setVisibility}
            BodyModal =  {<BodyModal unlocked={unlocked} />}
        />
        </>
    )
}

export default React.memo(PaymentComp)
