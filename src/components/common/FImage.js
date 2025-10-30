
import React from 'react'
import FastImage from '@d11/react-native-fast-image'
import Animated from 'react-native-reanimated'

class FImage extends React.Component {

  render(){
    return (
      <FastImage source={this.props.source} style={this.props.style} {...this.props} resizeMode={FastImage.resizeMode.contain} />
    )
  }
  
}

export const AnimatedFImage = Animated.createAnimatedComponent(FImage)
export default FImage