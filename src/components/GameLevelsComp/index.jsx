import { View, Text,Dimensions, TouchableOpacity } from 'react-native'
import React,{useCallback} from 'react'
import Header from '../common/Header'
import styles from './styles'
import ButtonImage from '../common/ButtonImage'
import FImage from '../common/FImage'
import { useTheme } from '@react-navigation/native'
import { withObservables } from '@nozbe/watermelondb/react'
import { NAME_LEVEL, PICTURE_LEVEL } from '../../constants/routeNames'
import Animated, {FadeOutDown, Layout,SlideInLeft,SlideInRight} from 'react-native-reanimated'
import Modal from '../common/Modal'
import updateGamedata from '../../utils/updateGamedata'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'


const LevelComp = React.memo(({level,
  colors,
  type,
  noanimals,
  index,
  navigation,
  sound,
  shouldplay,
  show,
  setShow,
  database,
  dispatch

}) => {
 
  let info = ""
  if (index == 1){
    info = "picture"
  }else if(index == 2){
      info = "picture (timed)"
  }else if(index == 3){
    info = "name"
  }else if(index == 4){
    info = "name (timed)"
  }else if(index == 5){
    info = "spelling"
  }else{
    info = "spelling (timed)"
  }
 
  const gotogame = () => {
    if(shouldplay){
      sound[0].play()
    }
   
    if(level.noAnimals < (noanimals)){
  
      if(index === 5 || index === 6){
        navigation.navigate('NAME LEVEL'+index,{
          animalslearnt: level.animalsLearnt,
          animalclass: level.animalClass,
          level:index,
          noanimals,
          timed:(index)%2 === 0 ? true : false
        })
      }else{
        navigation.navigate("PICTURE LEVEL"+index,{
          animalslearnt: level.animalsLearnt,
          animalclass: level.animalClass,
          level:index,
          noanimals,
          timed:(index)%2  === 0 ? true : false
        })
      }
    }else{
      let sh = [...show]
      sh[index-1] = true
      setShow(v => sh)
    }
  }

  const clearLevel = useCallback(() => {
    updateGamedata(database,type,index,[],0,dispatch)
    cancel()
  },[])

  const cancel = useCallback(() => {
    setShow([false,false,false,false,false,false])
  },[])


 return(
   <>
   <Animated.View
      entering={index%2 === 1 ? 
        SlideInLeft.delay((index-1)*25).duration(25).springify()
       : SlideInRight.delay((index-1)*25).duration(25).springify()
      }
      exiting={FadeOutDown.duration(100).springify()}
   >
  <TouchableOpacity activeOpacity={0.9} style={[styles.button,{backgroundColor:colors.modalbackground}]} useAsImage={false} onPress={gotogame}>
    <View style={styles.levelholder}>
      <Text style={styles.level}>Level {index}</Text>
    </View>
    <View style={styles.textholder}>
      <Text style={[styles.noani,{color:colors.textcolor}]}>{level.noAnimals}/{noanimals}</Text>
      <Text style={[styles.ani,{color:colors.animalcolor}]}>{type} {info}</Text>
    </View>
    <FImage source={ level.noAnimals >= (noanimals-1) ?
      require("../../assets/images/goldtrophy.webp")
      : require("../../assets/images/greyedtrophy.webp")
      } style={styles.image} />
  </TouchableOpacity>
  </Animated.View>
  {
      show[index-1] && <Modal
        visible={show[index-1]}
        Title="Already Completed!"
        BodyText="You have successfully completed this level. Do you want to clear your saved progress and restart this level?"
        LeftText={"YES"}
        LeftOnpress={clearLevel}
        RightText={"NO"}
        RightOnpress={cancel}
      />
    }

  </>
 )
 })
const enhance = withObservables(['level'],({level})=>({
  level
}))

const EnhancedLevelComp = enhance(LevelComp)

const GameLevelsComp = ({type,
  noanimals,
  leveldetails,
  gotolist,
  navigation,
  sound,
  shouldplay,
  show,
  setShow,
  database,
  showall,
  clearAll,
  cancelall,
  showModal,
  authDispatch
}) => {

  const {colors,dark} = useTheme()
  const height =  (Dimensions.get('window').height*0.11) + 10
  const keyextractor = useCallback(item => item.gameLevel,[])


  const getItemLayout = useCallback((data,index) => {
      return {index,length:height,offset:height*index}
  },[])
  
  const renderItem = ({item}) => {
     
      return  <EnhancedLevelComp 
                  level={item} 
                  colors={colors} 
                  type={type} 
                  noanimals={noanimals} 
                  index={parseInt(item.gameLevel[item.gameLevel.length-1])} 
                  navigation={navigation}
                  sound={sound}
                  shouldplay={shouldplay}
                  setShow={setShow}
                  show={show}
                  database={database}
                  dispatch={authDispatch} 
                  />
  }
 console.log("rendering game levels comp")
  const handleback = () => {
    console.log("handling back")
    navigation.navigate("Drawer")
    console.log("back handled")

  }
  return (
    <>
    <SafeAreaView style={styles.body}>
      <Header 
        LeftButton={"back"} 
        RightButton={<TouchableOpacity onPress={showModal} activeOpacity={0.9}
        handleback={handleback}
        >
        <FImage source={ dark ? require('../../assets/images/deletedark.webp')
          : require('../../assets/images/deletelight.webp')}   style={styles.delete}/>
      </TouchableOpacity>}
        
        Title="Select Level"
      />
      <View style={styles.body}>
          <View style={[styles.buttonholder,{backgroundColor:colors.background}]}>
          {/* {leveldetails.map((data,index)=>{
            return(
              <EnhancedLevelComp level={data} key={index} colors={colors} type={type} noanimals={noanimals} index={index} navigate={navigate} />
            )})} */}

            <Animated.FlatList
              itemLayoutAnimation={Layout.springify()}
              data={leveldetails}
              renderItem={renderItem}
              removeClippedSubviews={true}
              keyExtractor={keyextractor}
              maxToRenderPerBatch={1}
              initialNumToRender={1}
              contentContainerStyle={styles.flat}
              getItemLayout={getItemLayout}
            />
          
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              delayPressIn={0}
              activeOpacity={0.97}  
              onPress={gotolist}
              style={styles.factbutton}
              >
              <LinearGradient colors={['#58eb34','#2e691f']} style={styles.factbutton}>

                  <Text style={[styles.text,{color:'white'}]}>Facts about {type} </Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* <ButtonImage style={{width:500,height:60}} image={require("../../assets/images/emptybtn.png")} onSubmit={gotolist} useAsImage={true}/> */}
          </View>
      </View>
    </SafeAreaView>
    {
      showall && <Modal
        visible={showall}
        Title="Restart All levels!"
        BodyText="Do you want to clear your saved progress and restart all levels?"
        LeftText={"YES"}
        LeftOnpress={clearAll}
        RightText={"NO"}
        RightOnpress={cancelall}
      />
    }
        </>
  )
}

export default GameLevelsComp