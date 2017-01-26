import { combineReducers } from 'redux';
import PositionReducer from './reducer_position';

const rootReducer = combineReducers({
    position: PositionReducer
});

export default rootReducer;
