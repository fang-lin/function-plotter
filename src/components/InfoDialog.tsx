import React, {FunctionComponent} from 'react';
import {ParsedParams, stopPropagation} from './App.function';
import {version} from '../../package.json';
import {
    Close,
    DialogInner,
    TitleBar,
    Title
} from "./Dialog.style";
import {Dialog} from "./Dialog";

export interface InfoDialogProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const InfoDialog: FunctionComponent<InfoDialogProps> = (props) => {
    const {pushToHistory, params} = props;
    const close = () => pushToHistory({displayInfoDialog: false});
    const {displayInfoDialog} = params;
    return <Dialog {...stopPropagation} {...{isShow: displayInfoDialog, close}}>
        <TitleBar>
            <Title>About Function Diagram {version}</Title>
            <Close onClick={() => pushToHistory({displayInfoDialog: false})}/>
        </TitleBar>
        <DialogInner {...stopPropagation}>
            Text
        </DialogInner>
    </Dialog>;
};
