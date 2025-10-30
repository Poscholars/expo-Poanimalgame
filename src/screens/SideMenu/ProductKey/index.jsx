import React from 'react'
import ProductKeyComp from '../../../components/ProductKeyComp';



const ProductKey = ({visible,setVisibility,data,navigation}) => {
  
    const key = data[2].length == 0 ? null : data[2][0]._raw.key
    //const key = []

    return (
        <ProductKeyComp 
            visible={visible}
            setVisibility={setVisibility}
            phoneId={key}
            navigation={navigation}
        />
    )
}

export default ProductKey
