import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getSquareDistance} from '../utils/board_util';

export default ({square, origin, clickHandler, isCapture=false}) => {
    const distance = getSquareDistance(square, origin);
    const className = [
        'piece',
        isCapture ? 'guide' : 'guide',
        `${square.charAt(0)}file`,
        `rank${square.charAt(1)}`,
        `guide-move-${distance}`
    ].join(' ');

    return (
      <ReactCSSTransitionGroup
          transitionName={{
              appear: origin,
              appearActive: `${square}-active`
          }}
          transitionAppear={true}
          transitionAppearTimeout={400}
          transitionEnter={false}
          transitionLeave={false}>
            <div className={className} onClick={clickHandler}></div>
      </ReactCSSTransitionGroup>
    );
};
