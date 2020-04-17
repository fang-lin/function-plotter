import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Color, PaletteWrapper} from './Palette.style';
import {primary, size, toHex} from './Palette.function';

export interface PaletteProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}

export const Palette: FunctionComponent<PaletteProps> = (props) => {
    return <PaletteWrapper id="palette" {...{size}}>{
        primary.map((red) => primary.map((green) => primary.map((blue) => {
            const background = `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
            const style = {background};
            return <Color title={background} key={background} {...{style}} onClick={(): void => {
                props.setColor(background);
            }}>{background}</Color>;
        })))
    }</PaletteWrapper>;
};
