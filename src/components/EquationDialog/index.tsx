import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import {AddButton, ButtonWrapper, EquationTextarea, ErrorLabel, AddButtonIcon} from './styles';
import {Palette} from '../Palette/palette';
import {Close, DialogInner, Title, TitleBar, TitleIcon} from '../Dialog/styles';
import axisIcon from '../../images/icons/axis.png';
import {Dialog, transitionDuration} from '../Dialog';
import {ParsedParams} from '../../helpers';
import {equationFactory, formatEquation} from '../../services/Equations';
import {randomColor} from '../Palette/palette';

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
            setTimeout(() => {
                setExpression('');
                setColor(randomColor());
                setError(null);
            }, transitionDuration);
        } else {
            const equation = equations[editingEquationIndex];
            if (equation) {
                const {expression, color} = equation;
                setExpression(formatEquation(expression));
                setColor(color);
                setError(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingEquationIndex]);

    const addEquation = (): void => {
        try {
            const equation = equations[editingEquationIndex];
            if (equation) {
                equations[editingEquationIndex] = equationFactory(expression, color, equation.displayed);
            } else {
                equations.push(equationFactory(expression, color, true));
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
            <TitleIcon src={axisIcon}/>
            <Title onClick={addEquation}>Add Equation</Title>
            <Close onClick={close}/>
        </TitleBar>
        <DialogInner>
            <EquationTextarea style={{color, borderColor: color}} value={expression}
                onChange={changeEquation}/>
            <Palette {...{color, setColor}}/>
            <ButtonWrapper>
                <ErrorLabel style={{color}}>{error && `Error: ${error}`}</ErrorLabel>
                <AddButton onClick={addEquation}><AddButtonIcon/>Add</AddButton>
            </ButtonWrapper>
        </DialogInner>
    </Dialog>;
};
