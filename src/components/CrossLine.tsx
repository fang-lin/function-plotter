import React from 'react';
import {LineX, LineY} from './CrossLine.style';
import {Coordinate, Size} from "./App.function";

interface CrossLineProps {
    cursor: Coordinate;
    size: Size;
}

export const CrossLine = (props: CrossLineProps) => {
    const {cursor, size} = props;
    const styleX = {
        transform: `translate(${cursor[0]}px, 0)`,
        height: `${size[1]}px`
    };
    const styleY = {
        transform: `translate(0, ${cursor[1]}px)`,
        width: `${size[0]}px`
    };
    return (
        <span>
            <LineX style={styleX}/>
            <LineY style={styleY}/>
        </span>
    );
};



