import { selectedTheme } from '../constants'
import * as themeActionTypes from '../actions'

const initialState = {
    appTheme: selectedTheme,
    error: null
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case themeActionTypes.TOGGLE_THEME_BEGIN:
            return {
                ...state,
                error: null
            }
            break;
        case themeActionTypes.TOGGLE_THEME_SUCCESS:
            return {
                ...state,
                appTheme: action.payload.selectedTheme
            }
            break;
        case themeActionTypes.TOGGLE_THEME_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
            break;
        default:
            return state
    }
};

export default themeReducer;