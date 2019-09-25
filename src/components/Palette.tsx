import React, {Dispatch, SetStateAction} from 'react';
import {PaletteWrapper} from './Palette.style';
import {Coordinate, Equation} from './App.function';
import range from 'lodash/range';

export interface PaletteProps {

}

export const Palette = (props: PaletteProps) => {
    return <PaletteWrapper>
        {range(0, 16).map(r => range(0, 16).map(g => range(0, 16).map(b => (
            <span key={`${r}-${g}-${b}`} style={{background: `#${r}${g}${b}`}}>{`#${r}${g}${b}`}</span>
        ))))}
    </PaletteWrapper>;
};
