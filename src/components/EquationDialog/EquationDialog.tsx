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
import {ParametricEquation, ParametricEquationOptions} from '../../services/ParametricEquation';

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
        console.log( parse('[0,2*PI]').compile().evaluate());

        try {
            const trimmedExpression = expression.replace(/[\s\uFEFF\xA0\n\r]/g, '');
            const splitExpression = trimmedExpression.split(';');

            if (splitExpression.length === 3) {
                parse(splitExpression[0]).compile().evaluate({t: 0});
                parse(splitExpression[1]).compile().evaluate({t: 0});
                const domain: [number, number] = parse(splitExpression[2]).compile().evaluate().toArray();
                const equation = equations[editingEquationIndex];
                const options = {
                    fx: splitExpression[0],
                    fy: splitExpression[1],
                    domain,
                    color,
                    expression: trimmedExpression
                };

                if (equation) {
                    equations[editingEquationIndex] = equations[editingEquationIndex] = new ParametricEquation({
                        ...options,
                        displayed: equation.displayed
                    });
                } else {
                    equations.push(new ParametricEquation({...options, displayed: true}));
                }
            } else if (splitExpression.length === 1) {
                parse(trimmedExpression).compile().evaluate({x: 0});
                const equation = equations[editingEquationIndex];
                const options = {
                    expression: trimmedExpression,
                    color,
                    fn: trimmedExpression
                };

                if (equation) {
                    equations[editingEquationIndex] = new FunctionEquation({...options, displayed: equation.displayed});
                } else {
                    equations.push(new FunctionEquation({...options, displayed: true}));
                }
            }

            pushToHistory({
                equations,
                editingEquationIndex: -2
            });
        } catch (e) {
            setError(e.message);
            return;
        }
    };

    const changeEquation = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setError(null);
        setExpression(event.target.value);
    };

    const close = (): void => {
        pushToHistory({editingEquationIndex: -2});
    };

    return <Dialog {...{isShow: editingEquationIndex > -2}} >
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
