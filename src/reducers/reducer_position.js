import {INITIAL_POSITION, UPDATE_POSITION,
  HIGHLIGHT_SQUARE, CLEAR_HIGHLIGHT} from '../actions/index';

const INITIAL_STATE = {
    fen: INITIAL_POSITION,
    move: null,
    highlight: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_POSITION:
            return {
                fen: action.payload.fen,
                move: action.payload.move,
                highlight: null
            };
        case HIGHLIGHT_SQUARE: {
            return {
                fen: state.fen,
                move: null,
                highlight: action.payload
            };
        }
        case CLEAR_HIGHLIGHT: {
            return {
                highlight: null,
                move: null,
                fen: state.fen
            };
        }
        default:
            return state;
    }
}
