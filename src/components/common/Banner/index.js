import { View, Text } from 'react-native'
import React, { memo, useMemo } from 'react'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const isEqual = (prevProps,nextProps) => {
    const { adunit} = nextProps
    const{
      adunit:prevadunit
    } = prevProps
    const arequal = adunit === prevadunit 
    return arequal 
  }

const Banner = ({adunit}) => {
  const requestoptions = useMemo(() => [{
    requestNonPersonalizedAdsOnly: true
    }],[])
   
  return (
    <BannerAd
          unitId={adunit}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={requestoptions[0]}
    />
  )
}

export default  memo(Banner,isEqual)