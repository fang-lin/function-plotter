import React from 'react';
import { observer } from 'mobx-react';
import { cross_line, cross_line_x, cross_line_y } from './CrossLine.css';


const CrossLine = observer(props => {
    const { states, stage } = props;
    const { cursorX, cursorY } = states;
    const { width, height } = stage;
    const styleX = { transform: `translate(${cursorX}px, 0)`, height: `${height}px` };
    const styleY = { transform: `translate(0, ${cursorY}px)`, width: `${width}px` };
    return (
        <div className={ cross_line }>
            <hr className={ cross_line_x } style={ styleX }/>
            <hr className={ cross_line_y } style={ styleY }/>
        </div>
    );
});

export default CrossLine;
