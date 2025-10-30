import shuffleArray from "./shuffleArray"
import _ from 'lodash'

const genestring = (length) =>{
    if(length <= 0){
      return ""
    }else{
      let result = ""
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      for(let i = 0; i < length;i++){
        result += char.charAt(Math.floor(Math.random()*26))
      }
      return result
    }
  }

export default (totalan,anilearn) => {
  let totalArr = _.map(totalan,a => Object.keys(a)[0]);
  let totalArr2 = shuffleArray(_.filter(totalArr,item => !anilearn.includes(item)))
  let emptyarray = []
  for(var i = 0;i < totalArr2.length;i++){
    let anistring = totalArr2[i].split('-').join("").toUpperCase()

    let guessedstrings = genestring(16-anistring.length)
    let finalarray = shuffleArray((anistring+guessedstrings).split(""))

    let p = [totalArr2[i],totalArr2[i].toUpperCase().split("-"),finalarray]
    emptyarray.push(p)
  }
  return emptyarray
}

