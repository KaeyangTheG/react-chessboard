import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default (props) => {
    const distance = Math.max(getFileDistance(props.square, props.origin),
        getRankDistance(props.square, props.origin));
    const className = [
        'piece', 'guide', props.square, `move-${distance}`
    ].join(' ');

    return (
      <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnter={false}
          transitionLeave={false}>
            <div className={className}></div>
      </ReactCSSTransitionGroup>
    );
};

function getFileDistance (from, to) {
    const files = 'abcdefgh'.split('');
    return Math.abs(files.indexOf(from.charAt(0)) - files.indexOf(to.charAt(0)));
}

function getRankDistance (from, to) {
    return Math.abs(from.charAt(1) - to.charAt(1));
}
