import React from 'react';
import {getSquareDistance} from '../utils/board_util';

export default ({piece, square, clickHandler, from = null}) => {
    const type = `${piece.color}${getPieceName(piece.type)}`;
    const className = [
        'piece',
        square,
        type,
        `move-${from ? getSquareDistance(from, square) : 3}`,
        from ? 'moving' : ''
    ].join(' ');
    return (
        <piece onClick={clickHandler} className={className}>
        </piece>
    );
};

function getPieceName (code) {
    return {
        p: 'pawn',
        n: 'knight',
        b: 'bishop',
        r: 'rook',
        q: 'queen',
        k: 'king'
    }[code];
}
