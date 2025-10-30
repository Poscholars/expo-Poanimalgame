import { View, Text,FlatList,Dimensions,ScrollView,TouchableOpacity, Platform } from 'react-native'
import React,{useMemo,useCallback} from 'react'
import styles from './styles'
import Header from '../common/Header'
import { useTheme } from '@react-navigation/native'
import capitalize from '../../utils/capitalize'
import FImage from '../common/FImage'
import ButtonImage from '../common/ButtonImage'
import { SafeAreaView } from 'react-native-safe-area-context'
import Modal from '../common/Modal'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Banner from '../common/Banner'
const adUnitId = Platform.OS === 'android' ? 'ca-app-pub-7467526896400501/5186735733' : 'ca-app-pub-7467526896400501/5278219162';


const AnimalListFactsComp = ({anidata,images,index,onMomentumend,startReading,start,isPremium,gotopay,
  show,
  disableShow,
  enableShow}) => {
    const {colors} = useTheme()
 
    const keyextractor = useCallback(item => item.id,[])
    const p = useMemo(()=> anidata?.map((data,j)=>{ return {id:j,data:data}}),[])
    const height = Dimensions.get("window").width

    const getItemLayout = useCallback((data,index) => {
        if (index === 1 )return {index, length:0,offset:0}
        return {index,length:height,offset:height*index}
    },[])
 
   
    const renderItem = ({item}) => {
        //const isSelected = item.id === i
        const animal = Object.keys(item.data)[0]
        const onPressButton = () => {
          startReading(item.data[animal])
        }  
        return  <View style={styles.wrapper} >
                  <View style={{justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
                  <Text style={[styles.leftarr,{color:colors.textcolor}]}>
                      {'<-----'}
                  </Text>
                  <Text style={[styles.text,{color:colors.textcolor}]}>
                      {capitalize(animal)}
                  </Text>
                  <Text style={[styles.rightarr,{color:colors.textcolor}]}>
                      {'----->'}
                  </Text>
                  </View>
                  <FImage source={images[animal]} style={styles.image} />
                  {isPremium && <ButtonImage 
                    image={require('../../assets/images/facticon.webp')} 
                    useAsImage={true}
                    onSubmit={enableShow}
                    style={styles.listbutton}
                  />}
                  <View style={[false ? styles.line : styles.linepre,{backgroundColor:colors.green}]} />
                  <View style={[true ? styles.factsholder : styles.factsholdernot,{backgroundColor:colors.modalbackground,borderColor:colors.green}]}>
                  {Platform.OS == 'android' &&<View style={[styles.talkview,{backgroundColor:colors.green}]}>
                      <TouchableOpacity style={styles.talkbutton} onPress={onPressButton}>
                         <Text style={styles.play}>{!start ? "Play" : !isPremium ? "Stop" : "Playing"}</Text>
                      </TouchableOpacity>
                      </View>}
                      <ScrollView contentContainerStyle={styles.overallwrapper}>
                        {false ? <>
                                  <Text style={[styles.toptext,{color:colors.textcolor}]}>
                                    Did you know? 
                                  </Text>
                                  <Text style={[styles.bodytext,{color:colors.textcolor}]}>
                                    The Humpback whale produces the loudest sound of all living
                                    organisms.
                                  </Text>
                                  <TouchableOpacity onPress={gotopay}>
                                    <Text style={styles.activate}>
                                      UNLOCK <Text style={[styles.activate,{fontWeight:"bold"}]}>{capitalize(animal)}</Text> FACTS HERE.
                                    </Text>
                                  {/* <View
                                    style={styles.holdernew}
                                  >
                                  <Text style={styles.anitext}>
                                  {capitalize(animal).toUpperCase()} {'Facts'.toUpperCase()}:
                                  </Text>
                                  <Text style={styles.comingsoon}>
                                    {'Coming Soon...'.toUpperCase()}
                                  </Text>
                                  </View> */}
                                  </TouchableOpacity>
                                  </>:
                                  <>
                                    <Text style={[styles.toptext,{color:colors.textcolor}]}>
                                      Did you know? 
                                    </Text>
                                    <View>
                                      {
                                        item.data[animal].map((point,i)=>{
                                          return <View key={i} style={styles.pointholder}>
                                            <FImage 
                                              source={require('../../assets/images/bulleticon.webp')}
                                              style={styles.bullet}
                                              />
                                            <Text style={[styles.point,{color:colors.textcolor}]}>{point}</Text>
                                          </View>
                                        })
                                      }
                                    </View>
                                  </>}
                      </ScrollView>
                  </View>
                </View>
    }
   
  return (
    <SafeAreaView style={styles.container}>
      <Header
        LeftButton={"back"}  
        Title="Explore Animals"
      />
      <View style={styles.container}>
        <FlatList
          //  ref={aref}
            horizontal={true}
            data={p}
            renderItem={renderItem}
            removeClippedSubviews={true}
            keyExtractor={keyextractor}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            getItemLayout={getItemLayout}
            initialScrollIndex={index}
            pagingEnabled={true}
            onMomentumScrollBegin={onMomentumend}

        />
        <Banner adunit={adUnitId} />
      </View>
     {show && <Modal
              visible={show}
              Title={'Unlock Facts for all animals?'}
              BodyText="Do you want to unlock interesting facts for all the 500 animals in this Game?"
              LeftText={"CANCEL"}
              LeftOnpress={disableShow}
              RightText={"UNLOCK"}
              RightOnpress={gotopay}

                />}
    </SafeAreaView>
  )
}

export default AnimalListFactsComp