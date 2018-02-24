import {combineReducers} from "redux"
import userReducer from './user-reducer'
import pointReducer from './point-reducer'
import errorReducer from './error-reducer'
const reducers = combineReducers({
    userState: userReducer,
    pointState: pointReducer,
    errorState: errorReducer
});

export default reducers;