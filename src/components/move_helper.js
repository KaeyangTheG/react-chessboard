import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default (props) => {
    const className = [
        'piece', 'guide', props.square
    ].join(' ');

    return (
      <ReactCSSTransitionGroup
          transitionName="example"
          appear="example-appear"
          appearActive="example-appear-active"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnter={false}
          transitionLeave={false}>
            <div className={className}></div>
      </ReactCSSTransitionGroup>
    );
};
