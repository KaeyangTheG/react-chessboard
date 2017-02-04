import {UPDATE_PLAYERS} from '../actions/players';

const INITIAL_STATE = {
    w: 'hu',
    b: 'cpu'
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_PLAYERS:
            return action.payload;
    }
    return state;
}
