import React, {useEffect, useState} from 'react';
import {ConvertedParams, stopPropagation} from './App.function';
import {version} from '../../package.json';
import {
    Close,
    DialogBackground,
    DialogInner,
    DialogWrapper,
    TitleBar,
    Title, ButtonWrapper
} from "./Dialog.style";
import {AddButton, EquationTextarea} from "./EquationDialog.style";
import {Palette} from "./Palette";

export interface DialogProps {
    show: boolean;
    onClick: any;
    children: any;
}

export const Dialog = (props: DialogProps) => {
    const {show} = props;

    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (show) {
            setVisibility(true);
        } else {
            setTimeout(() => setVisibility(false), 300);
        }
    }, [show]);

    return visibility ?
        <DialogBackground {...stopPropagation} {...props}>
            <DialogWrapper {...stopPropagation} {...props}>
                {props.children}
            </DialogWrapper>
        </DialogBackground> : null;


};
