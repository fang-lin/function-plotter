import React, {Dispatch, MouseEventHandler, SetStateAction, useState} from 'react';
import {
    AddButton,
    ButtonWrapper, Close,
    EquationEditorBackground,
    EquationEditorInner,
    EquationEditorWrapper,
    EquationTextarea,
    Title
} from './EquationEditor.style';
import {Equation, stopPropagation} from './App.function';
import {Palette} from './Palette';

export interface EquationFormProps {
    equation: Equation;
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    equationEditorDisplay: boolean;
    setEquationEditorDisplay: Dispatch<SetStateAction<boolean>>;
}

export const EquationEditor = (props: EquationFormProps) => {
    const {equation: {fx, color, displayed}, equationEditorDisplay, setEquationEditorDisplay} = props;
    const [equationColor, setEquationColor] = useState<string>(color);
    const close: MouseEventHandler = () => setEquationEditorDisplay(false);

    return equationEditorDisplay ? <EquationEditorBackground {...stopPropagation} onClick={close}>
        <EquationEditorWrapper {...stopPropagation}>
            <Title>
                Add Equation
                <Close onClick={close}/>
            </Title>
            <EquationEditorInner {...stopPropagation}>
                <EquationTextarea defaultValue={fx} style={{color: equationColor, borderColor: equationColor}}/>
                <Palette {...{equationColor, setEquationColor}}/>
                <ButtonWrapper>
                    <AddButton>Add</AddButton>
                </ButtonWrapper>
            </EquationEditorInner>
        </EquationEditorWrapper>
    </EquationEditorBackground> : null;
};
