import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chess from 'chess.js';

import {updatePosition, highlightSquare, clearHighlight} from '../actions/index';
import Chesspiece from '../components/chesspiece';
import Highlight from '../components/highlight';
import Movehelper from '../components/move_helper';
import {PATTERN, SQUARES} from '../util/board_util';

class Chessboard extends Component {
    componentWillUpdate (nextProps) {
        this.board = new Chess(nextProps.fen);
    }

    render () {
        const squares = [...Array(64).keys()].map(n => {
            const colorClass = PATTERN[n] === 'w'
                ? 'light'
                : 'dark';

            return (
                <div id={SQUARES[n]} key={SQUARES[n]}
                    className={`${colorClass} square`}>
                </div>
            );
        });

        return (
            <div className="board"
                onClick={({target}) => this.onClickHandler(target)}>
                {squares}
                {this.props.fen && this.getPieces()}
                {this.props.highlight && <Highlight square={this.props.highlight} />}
                {this.props.highlight &&
                    this.getLegalMoves(this.props.highlight).map(square => {
                        return <Movehelper key={`guide-${square}`}
                            square={square} origin={this.props.highlight}
                            isCapture= {this.board.get(square)}
                            clickHandler = {
                                    this.props.updatePosition.bind(this, {
                                        from: this.props.highlight,
                                        to: square
                                    })
                                } />
                    })
                }
            </div>
        );
    }

    onClickHandler (elem) {
        const isPiece = elem.classList.contains('piece');
        if (isPiece) {
            return;
        }
        if (this.props.highlight) {
            this.props.clearHighlight();
        }
    }

    //get all legal moves from the provided origin square
    getLegalMoves (origin) {
        return this.board.moves({verbose: true})
            .filter(move => {
                return move.from === origin;
            })
            .map(move => {
                return move.to;
            });
    }

    getPieces () {
        const move = this.props.move || {};
        const board = this.board || new Chess(this.props.fen);

        return SQUARES
            .filter(code => {
                return code !== move.to &&
                    (board.get(code) || code === move.from);
            })
            .map(code => {
                const piece = board.get(code) || board.get(move.to);
                const square = code === move.from ? move.to : code;
                let clickHandler;


                if (this.props.highlight) {
                    clickHandler = this.props.clearHighlight;
                } else if (board.turn() === piece.color) {
                    clickHandler = this.props.highlightSquare.bind(this, square);
                }

                return <Chesspiece key={piece.type + code}
                    piece={piece} square={square}
                    from = {code === move.from && move.from}
                    clickHandler={clickHandler} />
            });
    }
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
    {updatePosition, highlightSquare, clearHighlight})(Chessboard);
