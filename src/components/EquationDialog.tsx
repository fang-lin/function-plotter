import React, {Dispatch, MouseEventHandler, SetStateAction, useState} from 'react';
import {
    AddButton,
    EquationTextarea
} from './EquationDialog.style';
import {Equation, stopPropagation} from './App.function';
import {Palette} from './Palette';
import {
    ButtonWrapper,
    Close,
    DialogBackground,
    DialogInner,
    DialogWrapper,
    TitleBar,
    Title
} from "./Base.style";

export interface EquationFormProps {
    equation: Equation;
    setEquations: Dispatch<SetStateAction<Equation[]>>;
    equationDialogDisplay: boolean;
    setEquationDialogDisplay: Dispatch<SetStateAction<boolean>>;
}

export const EquationDialog = (props: EquationFormProps) => {
    const {equation: {fx, color, displayed}, equationDialogDisplay, setEquationDialogDisplay} = props;
    const [equationColor, setEquationColor] = useState<string>(color);
    const close: MouseEventHandler = () => setEquationDialogDisplay(false);

    return equationDialogDisplay ? <DialogBackground {...stopPropagation} onClick={close}>
        <DialogWrapper {...stopPropagation}>
            <TitleBar>
                <Title>Add Equation</Title>
                <Close onClick={close}/>
            </TitleBar>
            <DialogInner {...stopPropagation}>
                <EquationTextarea defaultValue={fx} style={{color: equationColor, borderColor: equationColor}}/>
                <Palette {...{equationColor, setEquationColor}}/>
                <ButtonWrapper>
                    <AddButton>Add</AddButton>
                </ButtonWrapper>
            </DialogInner>
        </DialogWrapper>
    </DialogBackground> : null;
};
