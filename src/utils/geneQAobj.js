import _ from 'lodash'
import shuffleArray from './shuffleArray'

export default (currentI,totalPic) => {
    let pictures = totalPic
    let arrWithAnsRem = _.filter(pictures, (n) => { return n !== currentI})
    let shuffled = shuffleArray(arrWithAnsRem)
    return [shuffleArray([shuffled[0],shuffled[1],currentI,shuffled[2]]),currentI]
}