import React, {FunctionComponent, useEffect, useState} from 'react';
import {DrawingWrapper, DrawingBackground, Text, KeyframesStyle, DrawingIcon} from './styles';

export interface DrawingProps {
    redrawing: boolean;
}

const frames = [
    '_',
    '',
    '_',
    'D_',
    'DR_',
    'DRA_',
    'DRAW_',
    'DRAWI_',
    'DRAWIN_',
    'DRAWING_',
    'DRAWING._',
    'DRAWING.._',
    'DRAWING..._',
    'DRAWING...',
];

export const Redrawing: FunctionComponent<DrawingProps> = ({redrawing}) => {
    const [frameIndex, setFrameIndex] = useState(0);
    useEffect(() => {
        if (redrawing) {
            const timeoutId = setTimeout(() => {
                setFrameIndex(prev => (prev === frames.length ? 0 : prev + 1));
            }, 80);
            return () => clearTimeout(timeoutId);
        }
    }, [redrawing, frameIndex]);
    return (
        <DrawingWrapper redrawing={redrawing}>
            <DrawingBackground>
                <KeyframesStyle />
                <DrawingIcon />
                <Text>{frames[frameIndex]}</Text>
            </DrawingBackground>
        </DrawingWrapper>
    );
};
