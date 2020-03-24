import React, {useState} from 'react';
import {
    AddButton,
    EquationTextarea
} from './EquationDialog.style';
import {ConvertedParams, Equation, stopPropagation} from './App.function';
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
    pushToHistory: (params: Partial<ConvertedParams>) => void;
    params: ConvertedParams;
}

export const EquationDialog = (props: EquationFormProps) => {
    const {equation: {fx, color, displayed}, params, pushToHistory} = props;
    const {EQUATION_DIALOG_DISPLAY} = params;
    const [equationColor, setEquationColor] = useState<string>(color);

    return EQUATION_DIALOG_DISPLAY ?
        <DialogBackground {...stopPropagation} onClick={() => pushToHistory({EQUATION_DIALOG_DISPLAY: false})}>
            <DialogWrapper {...stopPropagation}>
                <TitleBar>
                    <Title>Add Equation</Title>
                    <Close onClick={() => pushToHistory({EQUATION_DIALOG_DISPLAY: false})}/>
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
