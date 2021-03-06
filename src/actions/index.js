import Chess from 'chess.js';

const chess = new Chess();

export const INITIAL_POSITION = chess.fen();
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const RESET_POSITION = 'RESET_POSITION';
export const HIGHLIGHT_SQUARE = 'HIGHLIGHT_SQUARE';
export const CLEAR_HIGHLIGHT = 'CLEAR_HIGHLIGHT';


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

export function clearHighlight () {
    return {
        type: CLEAR_HIGHLIGHT
    };
}
