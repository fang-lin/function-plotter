import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
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
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const EquationDialog: FunctionComponent<EquationDialogProps> = (props) => {
    const {params, pushToHistory} = props;
    const {editingEquationIndex, equations} = params;
    const [expression, setExpression] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (editingEquationIndex < -1) {
            setExpression('');
            setColor('#090');
            setError(null);
        } else {
            const equation = equations[editingEquationIndex];
            if (equation) {
                const {expression, color} = equation;
                setExpression(expression);
                setColor(color);
                setError(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingEquationIndex]);

    const addEquation = (): void => {
        try {
            parse(expression).compile().evaluate({x: 0});
        } catch (e) {
            setError(e.message);
            return;
        }

        const equation = equations[editingEquationIndex];
        if (equation) {
            equations[editingEquationIndex] = new FunctionEquation([expression, color, equation.displayed]);
        } else {
            equations.push(new FunctionEquation([expression, color, true]));
        }

        pushToHistory({
            equations,
            editingEquationIndex: -2
        });
    };

    const changeEquation = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setError(null);
        setExpression(event.target.value);
    };

    const close = (): void => {
        pushToHistory({editingEquationIndex: -2});
    };

    return <Dialog {...{isShow: editingEquationIndex > -2, close}} >
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
