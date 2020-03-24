import React from 'react';
import {ConvertedParams, stopPropagation} from './App.function';
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
    pushToHistory: (params: Partial<ConvertedParams>) => void;
    params: ConvertedParams;
}

export const InfoDialog = (props: InfoDialogProps) => {
    const {pushToHistory, params} = props;
    const {INFO_DIALOG_DISPLAY} = params;

    return INFO_DIALOG_DISPLAY ?
        <DialogBackground {...stopPropagation} onClick={() => pushToHistory({INFO_DIALOG_DISPLAY: false})}>
            <DialogWrapper {...stopPropagation}>
                <TitleBar>
                    <Title>About Function Diagram {version}</Title>
                    <Close onClick={() => pushToHistory({INFO_DIALOG_DISPLAY: false})}/>
                </TitleBar>
                <DialogInner {...stopPropagation}>
                    Text
                </DialogInner>
            </DialogWrapper>
        </DialogBackground> : null;
};
