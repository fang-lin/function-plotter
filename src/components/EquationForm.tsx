import React, {Dispatch, SetStateAction, useState} from 'react';
import {
    Button, ButtonWrapper, Close,
    EquationFormBackground,
    EquationFormInner,
    EquationFormWrapper,
    Textarea,
    Title
} from './EquationForm.style';
import {Equation, stopPropagation} from './App.function';
import {Palette} from './Palette';

export interface EquationFormProps {
    equation: Equation;
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    setDisplayEquationForm: Dispatch<SetStateAction<boolean>>;
}

export const EquationForm = (props: EquationFormProps) => {
    const {equation: {fx, color, display}, setDisplayEquationForm} = props;
    const [equationColor, setEquationColor] = useState<string>(color);
    const close = () => setDisplayEquationForm(false);

    return <EquationFormBackground {...stopPropagation} onClick={close}>
        <EquationFormWrapper {...stopPropagation}>
            <Title>
                Add Equation
                <Close onClick={close}/>
            </Title>
            <EquationFormInner {...stopPropagation}>
                <Textarea defaultValue={fx} style={{color: equationColor, borderColor: equationColor}}/>
                <Palette {...{equationColor, setEquationColor}}/>
                <ButtonWrapper>
                    <Button onClick={close}>Cancel</Button>
                    <Button>Add</Button>
                </ButtonWrapper>
            </EquationFormInner>
        </EquationFormWrapper>
    </EquationFormBackground>;
};
