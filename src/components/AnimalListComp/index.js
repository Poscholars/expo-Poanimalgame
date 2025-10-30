import { View,Text,FlatList,TouchableOpacity,Dimensions } from 'react-native'
import React,{useCallback,useMemo} from 'react'
import styles from './styles'
import Header from '../common/Header'
import { useNavigation, useTheme } from '@react-navigation/native'
import capitalize from '../../utils/capitalize'
import { ANIMAL_LIST_FACT } from '../../constants/routeNames'
import { SafeAreaView } from 'react-native-safe-area-context'



const isEqual = (prevProps,nextProps) => {
  const {onPress,animal} = nextProps
  const{onPress:prevOnpress, animal:prevAnimal} = prevProps
  const arequal = onPress === prevOnpress && animal === prevAnimal
  return arequal 
}

const Animal = React.memo(({stylebutton,styletext,animal,id,type}) => {
  const {navigate} = useNavigation()
  const {colors} = useTheme()

  const onClick = useCallback(()=>{
    navigate(ANIMAL_LIST_FACT,{
           type,
           id:id
         })
  },[])
  return <TouchableOpacity onPress={onClick} activeOpacity={0.8} style={stylebutton} >
            <Text style={[styletext,{color:colors.textcolor}]}>
                {capitalize(animal)}
            </Text>
          </TouchableOpacity>
},isEqual)


const AnimalListComp = ({type,anidata,handleBack}) => {
    const {colors} = useTheme()
    const keyextractor = useCallback(item => item.id,[])
    const p = useMemo(()=> anidata?.map((data,j)=>{ return {id:j,data:data}}),[])
    const height =  (Dimensions.get('window').height*0.045) + 0.8
    const stylebutton = useMemo(() => [styles.button,{borderColor:colors.green}],[colors])
    const styletext = useMemo(() => [styles.text,{color:colors.textcolor}],[colors])
    const getItemLayout = useCallback((data,index) => {
      return {index,length:height,offset:height*index}
    },[])
  
    const renderItem = ({item}) => {
        const animal = Object.keys(item.data)[0]
       
        return  <Animal
                //  onPress={onPress}
                  animal={animal}
                  stylebutton={stylebutton}
                  styletext={styletext}
                  id={item.id}
                  type={type}
                  />
    }

  return (
    <SafeAreaView style={styles.container}>
        <Header
             LeftButton={"back"}  
             Title="Select List"
             handleback={handleBack} 
        />
      <View style={styles.container}>
          <Text style={[styles.toptext,{color:colors.textcolor}]}>{type}</Text>
          <FlatList
            data={p}
            renderItem={renderItem}
            removeClippedSubviews={true}
            keyExtractor={keyextractor}
            maxToRenderPerBatch={3}
            initialNumToRender={16}
            getItemLayout={getItemLayout}
           // extraData={i}
          />
      </View>
    </SafeAreaView>
  )
}

export default React.memo(AnimalListComp)