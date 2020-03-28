import React, {FunctionComponent, ReactChildren, useEffect, useState} from 'react';
import {stopPropagation} from './App.function';
import {
    DialogBackground,
    DialogMask,
    DialogWrapper,
} from './Dialog.style';

export interface DialogProps {
    isShow: boolean;
    close: () => void;
}

export const transitionDuration: number = 200;

export const Dialog: FunctionComponent<DialogProps> = (props) => {
    const {isShow, close, children} = props;

    const [accessibility, setAccessibility] = useState<boolean>(false);
    const [appearance, setAppearance] = useState<boolean>(false);

    useEffect(() => {
        if (isShow) {
            setAccessibility(true);
            // setTimeout(() => setAppearance(true), 50);
            requestAnimationFrame(() => setAppearance(true));
        } else {
            setAppearance(false);
            setTimeout(() => setAccessibility(false), transitionDuration);
        }
    }, [isShow]);

    return accessibility ? <>
        <DialogMask {...{appearance}}/>
        <DialogBackground {...stopPropagation} onClick={close}>
            <DialogWrapper {...stopPropagation} {...{appearance}} > {children}</DialogWrapper>
        </DialogBackground>
    </> : null;
};
