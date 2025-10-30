import {SafeAreaView, View, Text,ImageBackground } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from '../common/Header'
import GameHeader from '../common/GameHeader'
import { useTheme } from '@react-navigation/native'
import FImage from '../common/FImage'
import ButtonImage from '../common/ButtonImage'
import { TouchableOpacity } from 'react-native-gesture-handler'

const GameResultComp = ({count,user,onShare,noanimals,loggedData,handleBack,next}) => {
  const {colors} = useTheme()
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        Title={"Result Level"}
        LeftButton={"back"}
        handleback={handleBack}  
      />
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        {/* <GameHeader count={count} user={user} live={live} noanimals={noanimals} /> */}
        <View style={styles.viewholder}>
          <View style={[styles.innercontainer,{backgroundColor:colors.modalbackground,borderColor:colors.green}]}>
              <View style={styles.viewone}>
              <FImage
                source={require("../../assets/images/thumbsup.webp")}
                style={styles.thumbsup} 
              />
              </View>
              <View style={styles.viewtwo}>
                <Text style={[styles.name,{color:colors.textcolor}]}>{loggedData[0].user_name}</Text>
              </View>
              <View style={styles.viewthree}>
                <ImageBackground 
                  source={require("../../assets/images/scoreboard.webp")}
                  style={styles.board}
                  resizeMode="contain"
                  >
                    <Text style={styles.score}>{noanimals}/{noanimals}</Text>
                </ImageBackground>
              </View>
              <View style={styles.viewfour}>
                <ButtonImage
                  image={require("../../assets/images/nextbutton.webp")}
                  useAsImage={true}
                  style={styles.nextbutton}
                  onSubmit={next}
                  />
              </View>
              <TouchableOpacity onPress={onShare} activeOpacity={0.8} style={styles.share}>
                <Text style={[styles.sharetext,{color:colors.green}]}>Share result with friends</Text>
              </TouchableOpacity>
              
          </View>

          {/* <TouchableOpacity style={styles.share}>
            <Text>Share result with friends</Text>
          </TouchableOpacity> */}
 
        </View>
      </View>
    </SafeAreaView>
  )
}

export default GameResultComp