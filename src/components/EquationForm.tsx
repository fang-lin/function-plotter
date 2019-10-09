import React, {Dispatch, MouseEventHandler, SetStateAction, useState} from 'react';
import {
    AddButton,
    ButtonWrapper, Close,
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
    displayEquationForm: boolean;
    setDisplayEquationForm: Dispatch<SetStateAction<boolean>>;
}

export const EquationForm = (props: EquationFormProps) => {
    const {equation: {fx, color, display}, displayEquationForm, setDisplayEquationForm} = props;
    const [equationColor, setEquationColor] = useState<string>(color);
    const close: MouseEventHandler = () => setDisplayEquationForm(false);

    return displayEquationForm && <EquationFormBackground {...stopPropagation} onClick={close}>
      <EquationFormWrapper {...stopPropagation}>
        <Title>
          Add Equation
          <Close onClick={close}/>
        </Title>
        <EquationFormInner {...stopPropagation}>
          <Textarea defaultValue={fx} style={{color: equationColor, borderColor: equationColor}}/>
          <Palette {...{equationColor, setEquationColor}}/>
          <ButtonWrapper>
            <AddButton/>
          </ButtonWrapper>
        </EquationFormInner>
      </EquationFormWrapper>
    </EquationFormBackground>;
};
