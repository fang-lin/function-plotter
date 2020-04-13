import React, {ChangeEvent, Component, FunctionComponent, ReactNode, useCallback, useEffect, useState} from 'react';
import {parse} from 'mathjs';
import {
    AddButton, ButtonWrapper,
    EquationTextarea,
    ErrorLabel
} from './EquationDialog.style';
import {Palette} from '../Palette/Palette';
import {FunctionEquation} from '../../services/FunctionEquation';
import {Close, DialogInner, Title, TitleBar} from '../Dialog/Dialog.style';
import {Dialog} from '../Dialog/Dialog';
import {ParsedParams} from '../../helpers/params';

interface EquationDialogProps {
    editingEquationIndex: number;
    setEditingEquationIndex: (index: number) => void;
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const EquationDialog: FunctionComponent<EquationDialogProps> = (props) => {
    const {editingEquationIndex, params, pushToHistory} = props;
    const {displayEquationDialog, equations} = params;
    const [expression, setExpression] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const reset = (): void => {
        setExpression('');
        setColor('#090');
        setError(null);
    };

    useEffect(() => {
        const equation = equations[editingEquationIndex];
        if (equation) {
            const {expression, color} = equation;
            setExpression(expression);
            setColor(color);
        }
        setError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingEquationIndex, equations.serialization().toString()]);

    const addEquation = (): void => {
        try {
            parse(expression).compile().evaluate({x: 0});
        } catch (e) {
            setError(e.message);
            return;
        }

        if (editingEquationIndex === -1) {
            equations.push(new FunctionEquation([expression, color, true]));
        } else {
            const equation = equations[editingEquationIndex];
            if (equation) {
                const {displayed} = equation;
                equations[editingEquationIndex] = new FunctionEquation([expression, color, displayed]);
            }
        }
        pushToHistory({
            equations,
            displayEquationDialog: false
        });
        reset();
    };

    const changeEquation = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setError(null);
        setExpression(event.target.value);
    };

    const close = (): void => {
        pushToHistory({displayEquationDialog: false});
        reset();
    };

    return <Dialog {...{isShow: displayEquationDialog, close}} >
        <TitleBar>
            <Title onClick={addEquation}>Add Equation</Title>
            <Close onClick={close}/>
        </TitleBar>
        <DialogInner>
            <EquationTextarea style={{color, borderColor: color}} value={expression} onChange={changeEquation}/>
            <Palette {...{color, setColor}}/>
            <ButtonWrapper>
                <ErrorLabel style={{color}}>{error && `Error: ${error}`}</ErrorLabel>
                <AddButton onClick={addEquation}>Add</AddButton>
            </ButtonWrapper>
        </DialogInner>
    </Dialog>;
};
