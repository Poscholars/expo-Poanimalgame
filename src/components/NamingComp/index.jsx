import { View,Text,TouchableOpacity,ScrollView,Platform} from 'react-native'
import React from 'react'
import styles from './styles'
import Header from '../common/Header'
import GameHeader from '../common/GameHeader'
import FImage from '../common/FImage'
import { useTheme } from '@react-navigation/native'
import { FadeComp, MoveComp } from '../SubPictureComp/FadeComp'
import Blink from '../SubNamingComp/Blink'
import AnimatedIndicator from '../SubNamingComp/AnimatedIndicator'
import OopsComp from '../SubPictureComp/OopsComp'
import FirstCoinAdComp from '../SubPictureComp/FirstCoinAdComp'
import GetCoinComp from '../SubPictureComp/GetCoinComp'
import Memopicback from '../SubNamingComp/Memopicback'
import BackPic from '../SubNamingComp/BackPic'
import Banner from '../common/Banner'
import { SafeAreaView } from 'react-native-safe-area-context'
const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/7757058751' : 'ca-app-pub-7467526896400501/7575141649';


const NamingComp = ({
  level,
  noanimals,
  count,
  imagestoshow,
  questAns,
  onChangeansoption,
  on,
  masterholder,
  change,
  showHint,
  setShowHint,
  live,
  visible,
  tryAgain,
  showCoinAdComp,
  loading,
  Time,
  Timed,
  stopgame,
  tryAgainTimed,
  restart,
  loadads,
  setVisibility,
  memocount,
  setLive,
  setShowCoinAdComp,
  setLoading,
  handleBack,
  animal,
  gotoList,
  totalani,
  isPremium
}) => {

  const {colors} = useTheme()
  console.log("rendering naming comp")
 
  return (
    <>
    <SafeAreaView style={styles.container}>
        {loadads && <Header
            LeftButton={"back"}  
            Title={`Level ${level}`}
            handleback={handleBack}
        />}
        <ScrollView style={styles.container}>
            {loadads &&<GameHeader 
                count={count}
                noanimals={noanimals}
                live={live}
                Time={Time}
                Timed={Timed}
                stopgame={stopgame}
                restart={restart}
                isPremium={isPremium}
            />}
            {(loadads&&on) && <FadeComp stylefade={styles.viewone}>
              <FImage 
                source={imagestoshow[questAns[0]]} 
                style={styles.displayImage} 
                resizeMode="contain" />
            </FadeComp>}
           {loadads && <View style={[questAns[1].length === 3 ? styles.viewtwothree : styles.viewtwo,{borderBottomColor:colors.green}]}>
              {
                questAns[1].map((arr,i)=>{
                  return(
                    <View key={i} style={styles.eachrow}>
                      {
                        arr.split("").map((char,j)=>{
                          return <View key = {j+char} style={[styles.char,{width:`${Math.min(12,84/arr.length)}%`}]}>
                                     <Memopicback
                                      char={masterholder[1][`${i}${j}`]}
                                     />
                                    {`${masterholder[2]}${masterholder[3]}` == `${i}${j}` ? <Blink style={styles.indicator}>
                                          <AnimatedIndicator change={change} />
                                       </Blink> : <View style={styles.indicator2} />}
                                </View>
                        })
                      }  
                      
                    </View>
                  )
                })
              }
            </View>}
            {(loadads && on) && 
            <MoveComp style={styles.viewthree}>
            <View style={styles.viewthreesc}>
              {
                masterholder[0].map((char,i)=>{
                  const click = () => {
                    onChangeansoption(char,i)
                  }
                  let show = showHint && (char === questAns[1][masterholder[2]][masterholder[3]])
                   return  <View style={styles.choiceview} key={i}>
                              <BackPic show={show} />
                              <TouchableOpacity activeOpacity={0.9} style={styles.choicebutton} onPress={click}>
                                <Text style={styles.text}>{char}</Text>
                              </TouchableOpacity>
                          </View>
                  
                })
              }
            </View>
            </MoveComp>}
            {loadads && <View style={styles.viewfour}>
              <GetCoinComp isPremium={isPremium} showHint={showHint} setShowHint={setShowHint} setShowCoinAdComp={setShowCoinAdComp}/>
            </View>}
            <Banner adunit={adUnitId} />
        </ScrollView>
    </SafeAreaView>

     {/*********OOPS pop up it shows when you exhaust your apple and the ads is ready to show *******************/}
     {loadads && <OopsComp 
        visible={visible}
        setVisibility={setVisibility}
        count={memocount}
        tryAgain={tryAgain}
        Timed={Timed}
        Time={Time}
        tryAgainTimed={tryAgainTimed}
        setLive={setLive}
        animal={animal}
        gotoList={gotoList}
        noanimals={totalani}
    />}
     {/********* First Pop up that shows when you exhaust your coin and wants to use hint*******************/}
    {loadads && <FirstCoinAdComp 
        showCoinAdComp={showCoinAdComp}
        setShowCoinAdComp={setShowCoinAdComp}
        loading={loading}
        setLoading={setLoading}
        />}

    </>
  )
}

export default NamingComp


                            
                  //           <TouchableOpacity activeOpacity={0.9} style={styles.choicebutton} onPress={click} key={i}>
                  //     <Text style={styles.text}>{char}</Text>
                  //  </TouchableOpacity>