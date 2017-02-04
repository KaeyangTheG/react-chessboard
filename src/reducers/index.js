import { combineReducers } from 'redux';
import PositionReducer from './reducer_position';
import PlayersReducer from './reducer_players';

const rootReducer = combineReducers({
    position: PositionReducer,
    players: PlayersReducer
});

export default rootReducer;
