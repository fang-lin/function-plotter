import React, {useEffect, useState} from 'react';
import {stopPropagation} from './App.function';
import {
    DialogBackground,
    DialogWrapper,
} from './Dialog.style';

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
        <DialogBackground {...props} {...stopPropagation} >
            <DialogWrapper {...props} {...stopPropagation} >
                {props.children}
            </DialogWrapper>
        </DialogBackground> : null;


};
