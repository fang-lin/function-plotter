import React, {Dispatch, MouseEventHandler, SetStateAction} from 'react';
import {stopPropagation} from './App.function';
import {version} from '../../package.json';
import {
    Close,
    DialogBackground,
    DialogInner,
    DialogWrapper,
    TitleBar,
    Title
} from "./Base.style";

export interface InfoDialogProps {
    infoDialogDisplay: boolean;
    setInfoDialogDisplay: Dispatch<SetStateAction<boolean>>;
}

export const InfoDialog = (props: InfoDialogProps) => {
    const {infoDialogDisplay, setInfoDialogDisplay} = props;
    const close: MouseEventHandler = () => setInfoDialogDisplay(false);

    return infoDialogDisplay ? <DialogBackground {...stopPropagation} onClick={close}>
        <DialogWrapper {...stopPropagation}>
            <TitleBar>
                <Title>About Function Diagram {version}</Title>
                <Close onClick={close}/>
            </TitleBar>
            <DialogInner {...stopPropagation}>
                Text
            </DialogInner>
        </DialogWrapper>
    </DialogBackground> : null;
};
