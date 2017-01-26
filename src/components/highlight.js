import React from 'react';

export default (props) => {
    //const file = `file-${props.square.charAt(0)}`;
    //const rank =  `rank-${props.square.charAt(1)}`;
    const className = [
        'square', 'highlight', props.square
    ].join(' ');
    return (
        <div className={className}></div>
    );
}
