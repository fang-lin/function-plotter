import React, {
    ComponentType,
    FunctionComponent,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import {DialogBackground, DialogMask, DialogWrapper} from './styles';
import {stopPropagation} from '../../pages/Plotter';

export interface DialogProps {
    isShow: boolean;
    Background?: ComponentType;
    Wrapper?: ComponentType;
}

export const transitionDuration = 200;

export const Dialog: FunctionComponent<PropsWithChildren<DialogProps>> = props => {
    const {isShow, children, Wrapper = DialogWrapper, Background = DialogBackground} = props;

    const [accessibility, setAccessibility] = useState<boolean>(false);
    const [appearance, setAppearance] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        if (isShow) {
            setAccessibility(true);
            requestAnimationFrame(() => setAppearance(true));
        } else {
            setAppearance(false);
            timeoutId = setTimeout(() => setAccessibility(false), transitionDuration);
        }
        return () => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };
    }, [isShow]);

    return accessibility ? (
        <>
            <DialogMask {...{appearance}} />
            <Background {...stopPropagation}>
                <Wrapper {...stopPropagation} {...{appearance}}>
                    {' '}
                    {children}
                </Wrapper>
            </Background>
        </>
    ) : null;
};
