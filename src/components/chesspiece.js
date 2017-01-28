import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {getSquareDistance} from '../utils/board_util';


export default ({piece, square, clickHandler, from = null}) => {
    const type = `${piece.color}${getPieceName(piece.type)}`;
    const className = [
        'piece',
        `${square.charAt(0)}file`,
        `rank${square.charAt(1)}`,
        type,
        `move-${from ? getSquareDistance(from, square) : 3}`,
        from ? 'moving' : ''
    ].join(' ');

    return (
        <ReactCSSTransitionGroup
            transitionName= {{
                appear: from || square,
                appearActive: square
            }}
            transitionAppear={true}
            transitionAppearTimeout={1}
            transitionEnter={false}
            transitionLeave={false}>
            <piece onClick={clickHandler} className={className}>
            </piece>
        </ReactCSSTransitionGroup>
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
