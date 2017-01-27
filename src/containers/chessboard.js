import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chess from 'chess.js';

import {updatePosition, highlightSquare} from '../actions/index';
import Chesspiece from '../components/chesspiece';
import Highlight from '../components/highlight';
import Movehelper from '../components/move_helper';

const pattern = [
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w'
];

const square_codes = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
];

class Chessboard extends Component {
    componentWillUpdate (nextProps) {
        this.chess = new Chess(nextProps.fen);
    }

    render () {
        const squares = [...Array(64).keys()].map(n => {
            const colorClass = pattern[n] === 'w'
                ? 'light'
                : 'dark';

            return (
                <div id={square_codes[n]} key={square_codes[n]}
                    className={`${colorClass} square`}>
                </div>
            );
        });

        return (
            <div className="board"
                onClick={({target}) => this.onClickHandler(target)}>
                {squares}
                {this.props.fen && getPieces(this.props.fen, this.props.move)}
                {this.props.highlight && <Highlight square={this.props.highlight} />}
                {this.props.highlight &&
                    this.getLegalMoves(this.props.highlight).map(square => {
                        return <Movehelper key={`guide-${square}`}
                            square={square} />;
                    })
                }
            </div>
        );
    }

    onClickHandler (elem) {
        const isPiece = elem.classList.contains('piece');

        const selected = isPiece
            ? extractSquare(elem.classList)
            : elem.id;

        if (this.props.highlight) {
            this.props.updatePosition({
                from: this.props.highlight,
                to: selected
            });
        } else if (isPiece) {
            this.props.highlightSquare(selected);
        }
    }

    //get all legal moves from the provided origin square
    getLegalMoves (origin) {
        return this.chess.moves({verbose: true})
            .filter(move => {
                return move.from === origin;
            })
            .map(move => {
                return move.to;
            });
    }

}

function extractSquare (classList) {
    const classes = String.prototype.split.call(classList, ' ');

    return classes.find(className => {
        return /^[a-h][1-8]$/.test(className);
    });
}

function mapStateToProps ({position}) {
    const {fen, move, highlight} = position;

    return {
        fen,
        move,
        highlight
    };
}

export default connect(mapStateToProps,
    {updatePosition, highlightSquare})(Chessboard);

function getPieces (fen, move) {
    const board = new Chess(fen);
    move = move || {};
    return square_codes
        .filter(code => {
            return code !== move.to &&
                (board.get(code) || code === move.from);
        })
        .map(code => {
            const piece = board.get(code) || board.get(move.to);
            return <Chesspiece key={piece.type + code}
                piece={piece} code={code} move={move} />
        });
}
