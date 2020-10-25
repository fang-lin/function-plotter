import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Color, PaletteWrapper} from './styles';
import {primary, rgbToHex, size} from './functions';

export * from './functions';

export interface PaletteProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}

export const Palette: FunctionComponent<PaletteProps> = (props) => {
    return <PaletteWrapper id="palette" {...{size}}>{
        primary.map((red) => primary.map((green) => primary.map((blue) => {
            const background = rgbToHex(red, green, blue);
            const style = {background};
            return <Color title={background} key={background} {...{style}} onClick={(): void => {
                props.setColor(background);
            }}>{background}</Color>;
        })))
    }</PaletteWrapper>;
};
