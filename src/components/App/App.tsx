import React, {Component, ReactNode, RefObject} from 'react';
import debounce from 'lodash/debounce';
import {AppWrapper} from './App.style';
import {Coordinate, DragEvent, DragEvents, DragState, getClient, getStageSize, Size} from './App.function';
import {RouteComponentProps} from 'react-router-dom';
import {PreloadImages} from '../PreloadImages/PreloadImages';
import {InfoDialog} from '../InfoDialog/InfoDialog';
import {EquationPanel} from '../EquationPanel/EquationPanel';
import {Stage} from '../Stage/Stage';
import {EquationDialog} from '../EquationDialog/EquationDialog';
import {ZoomPanel} from '../ZoomPanel/ZoomPanel';
import {ViewPanel} from '../ViewPanel/ViewPanel';
import {StateBar} from '../StateBar/StateBar';
import {combineURL, OriginalParams, ParsedParams, parseParams} from '../../helpers/params';

interface State {
    dragState: DragState;
    size: Size;
    redrawing: boolean;
    transform: Coordinate;
    cursor: Coordinate;
    trackPoint: Coordinate;
    client: Coordinate;
}

export class App extends Component<RouteComponentProps<OriginalParams>, State> {
    private readonly appRef: RefObject<HTMLDivElement>;

    constructor(props: RouteComponentProps<OriginalParams>) {
        super(props);
        this.appRef = React.createRef();
        this.state = {
            dragState: DragState.end,
            size: [0, 0],
            redrawing: false,
            transform: [0, 0],
            cursor: [0, 0],
            trackPoint: [0, 0],
            client: [0, 0]
        };
    }

    resetSize = (): void => this.setState({
        size: (getStageSize(this.appRef.current))
    });

    setCursor = (cursor: Coordinate): void => this.setState({cursor});
    setTrackPoint = (trackPoint: Coordinate): void => this.setState({trackPoint});

    setRedrawing = (redrawing: boolean): void => {
        this.setState({redrawing});
    };

    onResizing = debounce(this.resetSize, 200);
    onMoving = (event: DragEvent): void => this.setCursor(getClient(event));

    onDragStart = (event: DragEvent): void => {
        this.setState({
            client: getClient(event),
            dragState: DragState.start
        });
        window.addEventListener(DragEvents[DragState.moving], this.onDragging);
        window.addEventListener(DragEvents[DragState.end], this.onDragEnd);
        window.removeEventListener(DragEvents[DragState.moving], this.onMoving);
    };

    onDragging = (event: DragEvent): void => {
        const instantaneousClient = getClient(event);
        const {client} = this.state;

        this.setState({
            transform: [instantaneousClient[0] - client[0], instantaneousClient[1] - client[1]],
            dragState: DragState.moving
        });
    };

    onDragEnd = (event: DragEvent): void => {
        const instantaneousClient = getClient(event);
        const {state: {client}, props: {match: {params}}} = this;
        const {origin, scale} = parseParams(params);

        this.pushToHistory({
            origin: [
                origin[0] + (instantaneousClient[0] - client[0]) / scale,
                origin[1] + (instantaneousClient[1] - client[1]) / scale
            ]
        });
        this.setState({
            transform: [0, 0],
            dragState: DragState.end,
            client: [0, 0]
        });
        window.removeEventListener(DragEvents[DragState.moving], this.onDragging);
        window.removeEventListener(DragEvents[DragState.end], this.onDragEnd);
        window.addEventListener(DragEvents[DragState.moving], this.onMoving);
    };

    pushToHistory = (params: Partial<ParsedParams>): void => {
        this.props.history.push(combineURL(this.props.match.params, params));
    };

    componentDidMount(): void {
        this.resetSize();
        window.addEventListener('resize', this.onResizing);
        window.addEventListener(DragEvents[DragState.moving], this.onMoving);
        window.addEventListener(DragEvents[DragState.start], this.onDragStart);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.onResizing);
        window.removeEventListener(DragEvents[DragState.moving], this.onMoving);
        window.removeEventListener(DragEvents[DragState.start], this.onDragStart);
    }

    render(): ReactNode {
        try {
            const {setRedrawing, pushToHistory, setTrackPoint, state: {dragState, size, transform, cursor, redrawing, trackPoint}, props: {match}} = this;
            const params = parseParams(match.params);
            const {showCrossCursor} = params;

            return <AppWrapper {...{dragState, showCrossCursor}} ref={this.appRef}>
                <PreloadImages/>
                <Stage {...{cursor, size, transform, setRedrawing, params, setTrackPoint}}/>
                <StateBar {...{params, size, trackPoint, redrawing, pushToHistory}}/>
                <EquationPanel {...{
                    pushToHistory,
                    params,
                    size
                }}/>
                <ViewPanel {...{
                    pushToHistory,
                    params
                }}/>
                <ZoomPanel {...{
                    pushToHistory,
                    params,
                }}/>
                <EquationDialog {...{pushToHistory, params}}/>
                <InfoDialog {...{pushToHistory, params}}/>
            </AppWrapper>;
        } catch (e) {
            window.location.assign('error.html');
        }
    }
}




