import Chess from 'chess.js';

const chess = new Chess();
//chess.clear();
//chess.put({ type: 'k', color: 'w'}, 'e1');
//chess.put({ type: 'k', color: 'b'}, 'e8');
export const INITIAL_POSITION = chess.fen();
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const RESET_POSITION = 'RESET_POSITION';
export const HIGHLIGHT_SQUARE = 'HIGHLIGHT_SQUARE';


export function updatePosition (move) {
    chess.move(move);
    return {
        type: UPDATE_POSITION,
        payload: {
            fen: chess.fen(),
            move
        }
    };
};

export function resetPosition () {
    chess.load(INITIAL_POSITION);
    return {
        type: RESET_POSITION,
        payload: chess.fen()
    };
};

export function highlightSquare (square) {
    return {
        type: HIGHLIGHT_SQUARE,
        payload: square
    };
};
