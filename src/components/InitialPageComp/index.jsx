import { View, Text, TextInput,ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import FImage from '../common/FImage'
import { useTheme } from '@react-navigation/native'
import Header from '../common/Header'
import ButtonImage from '../common/ButtonImage'
import Modal from '../common/Modal'
import ViewHolderWithBorder from '../common/ViewHolderwithBorder'
import LoadingComponent from '../common/LoadingComponent'



const InitialPageComp = ({
    onChangeText,
    error,
    onSubmitYes,
    onSubmitNo,
    showModal,
    RightOnpress,
    name,
    loading
    }) => {

  const {colors,dark} = useTheme()

    const getborder = () => {
        if(error){
            return "red"
        }else{
        return colors.green
        }
    }

  return (
      <>
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
        <Header Title={'Animal Game'}/>
        <ScrollView contentContainerStyle={styles.scrollstyle}>
        <View style={styles.body}>
            <View style={styles.imageholder}>
                <FImage source={dark ?  require('../../assets/images/footborderdark.webp')
                                    :  require('../../assets/images/footborder.webp')
            } style={styles.footborder} />
            </View>
            <ViewHolderWithBorder>
                <View style={styles.inputwrapper}>
                <Text style={[styles.writeup,{color:colors.textcolor}]}>Hi</Text>
                <TextInput 
                    style={[
                        styles.input,
                        {color:colors.textcolor},
                        {borderBottomColor:getborder()}
                    ]} 
                    placeholder="your game name" 
                    placeholderTextColor={'#A6A6A6'} 
                    onChangeText={onChangeText}
                    value={name}
                />
                
                <Text style={[styles.comma,{color:colors.textcolor}]}>,</Text>
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : <></>}
                <Text style={[styles.downtext,{color:colors.textcolor}]}>Can you identify animals by their names?</Text>
            </ViewHolderWithBorder>
            <View style={styles.buttonholder}>
                <ButtonImage image={require('../../assets/images/Yesbutton.webp')} onSubmit={onSubmitYes} useAsImage={true} />
                <ButtonImage image={require('../../assets/images/Nobutton.webp')} onSubmit={onSubmitNo} useAsImage={true} />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    <Modal 
        visible={showModal}
        Title="Is your network active?"
        BodyText="Make sure your internet connection is active. Also, do well to input your username in the field provided."
        RightText="Got It"
        RightOnpress={RightOnpress}
        />
    <Modal
        visible={loading}
        bodyComponent={<LoadingComponent />}
    />
    </>
   
  )
}

export default InitialPageComp