import React, {FunctionComponent} from 'react';
import {DrawingWrapper, DrawingGooeyBackground, DrawingGooey, KeyframesStyle} from './Drawing.style';

export interface DrawingProps {
    redrawing: boolean;
}

export const Redrawing: FunctionComponent<DrawingProps> = ({redrawing}) => {
    return <DrawingWrapper redrawing={redrawing}>
        <KeyframesStyle/>
        <DrawingGooeyBackground>
            <DrawingGooey>
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </DrawingGooey>
        </DrawingGooeyBackground>
    </DrawingWrapper>;
};
