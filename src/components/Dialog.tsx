import React, {ComponentType, FunctionComponent, useEffect, useState} from 'react';
import {stopPropagation} from './App.function';
import {
    DialogBackground,
    DialogMask,
    DialogWrapper,
} from './Dialog.style';

export interface DialogProps {
    isShow: boolean;
    close: () => void;
    Background?: ComponentType;
    Wrapper?: ComponentType;
}

export const transitionDuration = 200;

export const Dialog: FunctionComponent<DialogProps> = (props) => {
    const {isShow, close, children, Wrapper = DialogWrapper, Background = DialogBackground} = props;

    const [accessibility, setAccessibility] = useState<boolean>(false);
    const [appearance, setAppearance] = useState<boolean>(false);

    useEffect(() => {
        if (isShow) {
            setAccessibility(true);
            requestAnimationFrame(() => setAppearance(true));
        } else {
            setAppearance(false);
            setTimeout(() => setAccessibility(false), transitionDuration);
        }
    }, [isShow]);

    return accessibility ? <>
        <DialogMask {...{appearance}}/>
        <Background {...stopPropagation} onClick={close}>
            <Wrapper {...stopPropagation} {...{appearance}} > {children}</Wrapper>
        </Background>
    </> : null;
};
