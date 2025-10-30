import { Q } from "@nozbe/watermelondb"
import { UPDATE_GAMEDATA } from "../constants/actionTypes"
 
export default async (database,animalClass,level,aniLearnt,noanimals,dispatch) => {
  // console.log(aniLearnt.length)
    const animal = await database.collections.get("animaldata").query(
        Q.where('animal_class',animalClass),
        Q.where('game_level',`level${level}`)
    ).fetch()
    await database.write(async () => {
        animal[0].update((data) => {
          data.noAnimals = parseInt(noanimals)
          data.animalsLearnt = JSON.stringify(aniLearnt)
        })
        dispatch({
          type:UPDATE_GAMEDATA,
          payload:Math.random()
        })
      })
      

}