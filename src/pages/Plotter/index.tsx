import React, {Component, ReactNode, RefObject} from 'react';
import debounce from 'lodash/debounce';
import {AppWrapper, FullScreenGlobalStyle} from './styles';
import {Coordinate, DragEvent, DragEvents, DragState, getClient, getStageSize, Size} from './functions';
import {RouteComponentProps} from 'react-router-dom';
import {PreloadImages} from '../../components/PreloadImages';
import {InfoDialog} from '../../components/InfoDialog';
import {EquationPanel} from '../../components/EquationPanel';
import {Stage} from '../../components/Stage';
import {EquationDialog} from '../../components/EquationDialog';
import {ZoomPanel} from '../../components/ZoomPanel';
import {ViewPanel} from '../../components/ViewPanel';
import {StateBar} from '../../components/StateBar';
import {Redrawing} from '../../components/Redrawing';
import {
    combinePathToURL,
    OriginalParams,
    ParsedParams,
    parseParams,
    stringifyParams
} from '../../helpers';

export * from './functions';

interface State {
    dragState: DragState;
    size: Size;
    redrawing: boolean;
    transform: Coordinate;
    cursor: Coordinate;
    trackPoint: Coordinate;
    client: Coordinate;
}

export class Plotter extends Component<RouteComponentProps<OriginalParams>, State> {
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

    pushToHistory = (parsedParams: Partial<ParsedParams>): void => {
        const {history: {push}, match: {params}} = this.props;
        push(combinePathToURL(stringifyParams({...parseParams(params), ...parsedParams})));
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
                <FullScreenGlobalStyle/>
                <PreloadImages/>
                <Stage {...{cursor, size, transform, setRedrawing, params, setTrackPoint}}/>
                <Redrawing {...{redrawing}}/>
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




