import {getMove, getScore} from './chess_engine';
import {updatePosition} from '../actions/index';
import Chess from 'chess.js';

export function getEngineMove (prevState, nextState, action, dispatch) {
    let board;

    if (prevState.position.fen === nextState.position.fen) {
        return;
    }

    board = new Chess(nextState.position.fen);

    if (nextState.players[board.turn()] === 'cpu') {
        getMove(nextState.position.fen)
            .then((move) => {
                dispatch(updatePosition({
                    from: move.substr(0,2),
                    to: move.substr(2)
                }))
            });
    }
}
