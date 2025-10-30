import { Q } from "@nozbe/watermelondb"
import { UPDATE_GAMEDATA } from "../constants/actionTypes"

export default async (database,type,dispatch) => {

   await database.write(async() => {
        const gameData = await database.collections.get('animaldata').query(Q.where('animal_class',type)).fetch()
        const datagame = gameData.map(data => data.prepareUpdate(write=>{
            write.animalsLearnt = "[]"
            write.noAnimals = 0
        }
        ))
        database.batch(...datagame)
        dispatch({
            type:UPDATE_GAMEDATA,
            payload:Math.random()
        })
    })
         
    


}