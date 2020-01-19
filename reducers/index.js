import { combineReducers } from 'redux';

// Imports: Reducers
import coreReducer from './coreReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  core: coreReducer,
});

// Exports
export default rootReducer;