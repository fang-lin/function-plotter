import React, {FunctionComponent, useEffect, useState, useCallback} from 'react';
import {
    AddButton,
    EquationTextarea
} from './EquationDialog.style';
import {ParsedParams} from './App.function';
import {Palette} from './Palette';
import {
    ButtonWrapper,
    Close,
    DialogInner,
    TitleBar,
    Title
} from './Dialog.style';
import {Dialog} from './Dialog';
import {Equation} from '../services/Equation';
import {FunctionEquation} from "../services/FunctionEquation";

export const EquationDialog: FunctionComponent<EquationFormProps> = (props) => {
    const {editingEquationIndex, params, pushToHistory} = props;
    const {displayEquationDialog, equations} = params;
    const [expression, setExpression] = useState<string>('');
    const [color, setColor] = useState<string>('');

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
    };

    useEffect(() => {
        merge(reset, (equation) => {
            setExpression(equation.expression);
            setColor(equation.color);
        });
    }, [merge]);

    const addEquation = (): void => {
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
            <EquationTextarea style={{color, borderColor: color}} value={expression}
                              onChange={(event): void => setExpression(event.target.value)}/>
            <Palette {...{color, setColor}}/>
            <ButtonWrapper>
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

