import React, {ComponentType, FunctionComponent, useEffect, useState} from 'react';
import {DialogBackground, DialogMask, DialogWrapper} from './styles';
import {stopPropagation} from '../../pages/Diagraph';

export interface DialogProps {
    isShow: boolean;
    Background?: ComponentType;
    Wrapper?: ComponentType;
}

export const transitionDuration = 200;

export const Dialog: FunctionComponent<DialogProps> = (props) => {
    const {isShow, children, Wrapper = DialogWrapper, Background = DialogBackground} = props;

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
        <Background {...stopPropagation}>
            <Wrapper {...stopPropagation} {...{appearance}} > {children}</Wrapper>
        </Background>
    </> : null;
};
