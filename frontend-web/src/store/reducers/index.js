import { combineReducers } from "redux";
import userReducer from './user';
import errorsReducer from './errors'
import studentReducer from './student';
import mapReducer from './map'

const rootReducer = combineReducers({
  user: userReducer,
  errors: errorsReducer,
  student: studentReducer,
  map : mapReducer
});

export default rootReducer;