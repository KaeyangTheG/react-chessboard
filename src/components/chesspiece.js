import React from 'react';

export default ({piece, code, move}) => {
    const type = `${piece.color}${getPieceName(piece.type)}`;
    const square = code === move.from ? move.to : code;
    return (
        <piece className={['piece', square, type].join(' ')}>
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
