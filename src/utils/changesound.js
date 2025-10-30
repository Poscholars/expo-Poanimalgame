import { UPDATE_SOUND } from "../constants/actionTypes"
import updateSavedSound from "./updateSavedSound"

export default (database,dispatch,currentsound) => {
    updateSavedSound(database)
    dispatch({
        type:UPDATE_SOUND,
        payload:!currentsound
    })
}