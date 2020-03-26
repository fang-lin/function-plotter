import React, {FunctionComponent, useEffect, useState} from 'react';
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
} from "./Dialog.style";
import {Dialog, DialogProps} from "./Dialog";
import {Equation} from "../services/Equation";

export const EquationDialog: FunctionComponent<EquationFormProps> = (props) => {
    const {editingEquationIndex, params, pushToHistory} = props;
    const {displayEquationDialog, equations} = params;
    const [fx, setFx] = useState<string>('');
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        merge(reset, (equation) => {
            setFx(equation.fx);
            setColor(equation.color);
        });
    }, [editingEquationIndex]);

    const reset = () => {
        setFx('');
        setColor('#090');
    };

    const merge = (adding: () => void, editing: (equation: Equation) => void) => {
        if (editingEquationIndex === -1) {
            adding();
        } else {
            const equation = equations[editingEquationIndex];
            if (equation) {
                editing(equation);
            }
        }
    };

    const addEquation = () => {
        merge(() => {
            equations.push(new Equation({fx, color, displayed: true}));
        }, (equation) => {
            const {displayed} = equation;
            equations[editingEquationIndex] = new Equation({fx, color, displayed});
        });
        pushToHistory({
            equations,
            displayEquationDialog: false
        });
        reset();
    };

    const close = () => {
        pushToHistory({displayEquationDialog: false});
        reset();
    };

    return <Dialog {...{isShow: displayEquationDialog, close}} >
        <TitleBar>
            <Title onClick={addEquation}>Add Equation</Title>
            <Close onClick={close}/>
        </TitleBar>
        <DialogInner>
            <EquationTextarea style={{color, borderColor: color}} value={fx}
                              onChange={event => setFx(event.target.value)}/>
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

interface EquationFormState {
    fx: string;
    color: string;
    displayed: boolean;
}

// export class EquationDialog extends Component<EquationFormProps, EquationFormState> {
//
//     constructor(props: EquationFormProps) {
//         super(props);
//         this.state = {
//             fx: '', color: '', displayed: true
//         };
//     }
//
//     componentDidUpdate(prevProps: Readonly<EquationFormProps>): void {
//         console.log(this.props.editingEquationIndex);
//         if (prevProps.editingEquationIndex !== this.props.editingEquationIndex) {
//             const {editingEquationIndex, params: {equations}} = this.props;
//             const {fx, color, displayed} = equations[editingEquationIndex] || defaultEquation;
//             this.setState({fx, color, displayed});
//         }
//     }
//
//     addEquation = () => {
//         const {editingEquationIndex, pushToHistory, params: {equations}} = this.props;
//         if (editingEquationIndex > -1) {
//             equations[editingEquationIndex] = new Equation(this.state);
//         } else {
//             equations.push(new Equation(this.state));
//         }
//         pushToHistory({
//             equations,
//             displayEquationDialog: false
//         });
//     };
//
//     close = () => {
//         this.props.setEditingEquationIndex(-1);
//         this.props.pushToHistory({displayEquationDialog: false});
//     };
//
//     setColor = (color: string) => this.setState({color});
//
//     setFx = (event: ChangeEvent<any>) => {
//         this.setState({fx: event.target.value});
//     };
//
//     render() {
//         const {displayEquationDialog} = this.props.params;
//         const {fx, color} = this.state;
//         const {setFx, setColor, addEquation, close} = this;
//
//         return <Dialog show={displayEquationDialog} onClick={close}>
//             <TitleBar>
//                 <Title onClick={addEquation}>Add Equation</Title>
//                 <Close onClick={close}/>
//             </TitleBar>
//             <DialogInner>
//                 <EquationTextarea style={{color, borderColor: color}} value={fx} onChange={setFx}/>
//                 <Palette {...{color, setColor}}/>
//                 <ButtonWrapper>
//                     <AddButton onClick={addEquation}>Add</AddButton>
//                 </ButtonWrapper>
//             </DialogInner>
//         </Dialog>;
//     }
// }
