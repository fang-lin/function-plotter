import React, {Dispatch, SetStateAction} from 'react';
import {PaletteWrapper} from './Palette.style';
import {Coordinate, Equation} from './App.function';
import range from 'lodash/range';

const toHex = (n: number): string => n.toString(16);
const primary = range(0, 15, 2);

export interface PaletteProps {
    equationColor: string;
    setEquationColor: Dispatch<SetStateAction<string>>
}

export const Palette = (props: PaletteProps) => {
    const {setEquationColor} = props;
    return <PaletteWrapper>
        {primary.map(r => primary.map(g => primary.map(b => {
            const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            return <a key={hexColor} style={{backgroundColor: hexColor}} title={hexColor}
                      onClick={() => setEquationColor(hexColor)}>{hexColor}</a>;
        })))}
    </PaletteWrapper>;
};
