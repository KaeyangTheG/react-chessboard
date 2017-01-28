import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getSquareDistance} from '../utils/board_util';

export default ({square, origin, clickHandler, isCapture=false}) => {
    const distance = getSquareDistance(square, origin);
    const className = [
        'piece',
        isCapture ? 'capture-guide' : 'guide',
        square,
        `move-${distance}`
    ].join(' ');

    return (
      <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnter={false}
          transitionLeave={false}>
            <div className={className} onClick={clickHandler}></div>
      </ReactCSSTransitionGroup>
    );
};
