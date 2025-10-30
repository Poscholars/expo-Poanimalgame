import { View, Text, Platform} from 'react-native'
import React from 'react'
import Header from '../common/Header'
import styles from './styles'
import FImage from '../common/FImage'
import { useTheme } from '@react-navigation/native'
import GameButton from '../common/GameButton'
import OopsComp from '../SubPictureComp/OopsComp'
import FirstCoinAdComp from '../SubPictureComp/FirstCoinAdComp'
import GameHeader from '../common/GameHeader'
import { FadeComp, MoveComp } from '../SubPictureComp/FadeComp'
import capitalize from '../../utils/capitalize'
import GetCoinComp from '../SubPictureComp/GetCoinComp'
import Banner from '../common/Banner'
import { SafeAreaView } from 'react-native-safe-area-context'
import genTransRef from '../../utils/genTransRef'
const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/7757058751' : 'ca-app-pub-7467526896400501/7575141649';

const PictureGameComp = ({level,
  questAns,
  noanimals,
  imagestoshow,
  count,
  nextquest,
  on,
  setShowCoinAdComp,
  showHint,
  live,
  visible,
  setVisibility,
  tryAgain,
  showCoinAdComp,
  loading,
  picturegame,
  Time,
  Timed,
  stopgame,
  tryAgainTimed,
  setLive,
  loadads,
  setLoading,
  pressed,
  pressed1,
  restart,
  memocount,
  handleBack,
  animal,
  gotoList,
  totalani,
  isPremium
}) => {
  const {colors} = useTheme()
 
  return (
    <>
    <SafeAreaView style={styles.container}>
      <Header
        LeftButton={"back"}  
        Title={`Level ${parseInt(level)}`}
        handleback={handleBack} 
        />
      <View style={styles.container}>
        <GameHeader 
          count={count}
          noanimals={noanimals}
          live={live}
          Time={Time}
          Timed={Timed}
          stopgame={stopgame}
          restart={restart}
          isPremium={isPremium}
          />
       {on && <FadeComp
                  stylefade={[
                   picturegame ?
                    styles.viewthree
                    : styles.viewthreetext,
                    {backgroundColor:colors.modalbackground,borderColor:colors.green}
                  ]}
                >
                  {picturegame ? 
                      <FImage 
                        source={imagestoshow[questAns[1]]} 
                        style={styles.displayImage} 
                        resizeMode="contain" /> :
                        <Text style={[styles.titletext,{color:colors.textcolor}]}>{
                        capitalize(questAns[1])
                        }</Text>}
            </FadeComp>}
        {on && <MoveComp
                  stylemove={picturegame ?
                    styles.viewfour
                    : styles.viewfourtext}
                >
          {questAns[0].map((data,i)=>{
              const checkAns = () => {
                nextquest(questAns[1],data)
              }
           //   console.log("rendering picture game button:", data)
            return  <GameButton key={genTransRef(10)} 
                        style={picturegame ?
                          styles.buttonclick
                          : styles.buttonclicktext} 
                        ans={questAns[1]} 
                        butans={data} 
                        onSubmit={checkAns} 
                        showHint={showHint}
                        offbutton={pressed}
                        pressed1={pressed1}
                        >
                          {picturegame ? <Text style={styles.text}>{capitalize(data)}</Text>
                          :  <FImage 
                                source={imagestoshow[data]} 
                                style={styles.displayImage} 
                                resizeMode="contain" />}
                    </GameButton>
          })}
        </MoveComp>}
        <View style={styles.viewfive}>
          <GetCoinComp isPremium={isPremium} showHint={showHint} setShowCoinAdComp={setShowCoinAdComp} />
        </View>
        <View style={styles.viewfive}>
          <Banner adunit={adUnitId} />
        </View>
      </View>
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

export default React.memo(PictureGameComp)