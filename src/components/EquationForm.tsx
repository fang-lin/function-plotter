import React, {Dispatch, SetStateAction, useState} from 'react';
import {EquationPanelWrapper} from './EquationPanel.style';
import {Coordinate, Equation} from './App.function';
import {Palette} from './Palette';

export interface EquationFormProps {
    equation: Equation;
    setEquations: Dispatch<SetStateAction<Equation[]>>;
}

export const EquationForm = (props: EquationFormProps) => {
    const {equation} = props;
    const {color} = equation;
    const [equationColor, setEquationColor] = useState<string>(color);

    return <div>
        <Palette {...{equationColor, setEquationColor}}/>
    </div>;
};
