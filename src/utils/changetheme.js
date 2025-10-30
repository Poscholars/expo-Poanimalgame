import { UPDATE_THEME } from "../constants/actionTypes"
import updateSavedTheme from "./updateSavedTheme"

export default (database,dispatch,darktheme) => {
    updateSavedTheme(database)
    dispatch({
        type:UPDATE_THEME,
        payload:!darktheme
    })
}