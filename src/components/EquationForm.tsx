import React, {Dispatch, SetStateAction, useState} from 'react';
import {EquationFormWrapper} from './EquationForm.style';
import {Coordinate, Equation} from './App.function';
import {Palette} from './Palette';

export interface EquationFormProps {
    equation: Equation;
    setEquations: Dispatch<SetStateAction<Equation[]>>;
}

export const EquationForm = (props: EquationFormProps) => {
    const {equation: {fx, color, display}} = props;
    const [equationColor, setEquationColor] = useState<string>(color);

    return <EquationFormWrapper>
        <Palette {...{equationColor, setEquationColor}}/>
    </EquationFormWrapper>;
};
