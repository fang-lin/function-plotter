import React, {FunctionComponent, useEffect, useState, useCallback, ChangeEvent} from 'react';
import {parse} from 'mathjs';
import {
    AddButton, ButtonWrapper,
    EquationTextarea,
    ErrorLabel
} from './EquationDialog.style';
import {ParsedParams} from './App.function';
import {Palette} from './Palette';
import {
    Close,
    DialogInner,
    TitleBar,
    Title
} from './Dialog.style';
import {Dialog} from './Dialog';
import {Equation} from '../services/Equation';
import {FunctionEquation} from '../services/FunctionEquation';

export const EquationDialog: FunctionComponent<EquationFormProps> = (props) => {
    const {editingEquationIndex, params, pushToHistory} = props;
    const {displayEquationDialog, equations} = params;
    const [expression, setExpression] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const merge = useCallback(
        (adding: () => void, editing: (equation: Equation) => void): void => {
            if (editingEquationIndex === -1) {
                adding();
            } else {
                const equation = equations[editingEquationIndex];
                if (equation) {
                    editing(equation);
                }
            }
        }, [editingEquationIndex, equations],
    );

    const reset = (): void => {
        setExpression('');
        setColor('#090');
        setError(null);
    };

    useEffect(() => {
        merge(reset, (equation) => {
            setExpression(equation.expression);
            setColor(equation.color);
        });
    }, [merge]);

    const addEquation = (): void => {
        try {
            parse(expression).compile().evaluate({x: 0});
        } catch (e) {
            setError(e.message);
            return;
        }
        merge(() => {
            equations.push(new FunctionEquation([expression, color, true]));
        }, (equation) => {
            const {displayed} = equation;
            equations[editingEquationIndex] = new FunctionEquation([expression, color, displayed]);
        });
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

interface EquationFormProps {
    editingEquationIndex: number;
    setEditingEquationIndex: (index: number) => void;
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

