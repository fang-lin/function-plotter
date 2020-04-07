import React, {Component, ReactNode, RefObject} from 'react';
import debounce from 'lodash/debounce';
import {AppWrapper} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    DragState,
    getStageSize,
    Size,
    parseParams,
    OriginalParams,
    getClient,
    DragEvents,
    ParsedParams,
    combineURL,
    DragEvent
} from './App.function';
import {EquationPanel} from './EquationPanel';
import {EquationDialog} from './EquationDialog';
import {InfoDialog} from './InfoDialog';
import {RouteComponentProps} from 'react-router-dom';

interface State {
    dragState: DragState;
    size: Size;
    redrawing: boolean;
    transform: Coordinate;
    cursor: Coordinate;
    editingEquationIndex: number;
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
            editingEquationIndex: -1,
            client: [0, 0]
        };
    }

    resetSize = (): void => this.setState({
        size: (getStageSize(this.appRef.current))
    });

    setCursor = (cursor: Coordinate): void => this.setState({cursor});

    setEditingEquationIndex = (editingEquationIndex: number): void => this.setState({editingEquationIndex});

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
        const {client} = this.state;
        const {origin} = parseParams(this.props.match.params);

        this.pushToHistory({
            origin: [
                origin[0] + instantaneousClient[0] - client[0],
                origin[1] + instantaneousClient[1] - client[1]
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
        const params = parseParams(this.props.match.params);
        const {dragState, size, transform, cursor, redrawing, editingEquationIndex} = this.state;
        const {setRedrawing, pushToHistory, setEditingEquationIndex} = this;

        return <AppWrapper {...{dragState}} ref={this.appRef}>
            <PreloadImages/>
            <Stage {...{cursor, size, transform, setRedrawing, params}}/>
            <StateBar {...{params, cursor, size, redrawing, pushToHistory}}/>
            <EquationPanel {...{
                pushToHistory,
                params,
                size,
                setEditingEquationIndex
            }}/>
            <ViewPanel {...{
                pushToHistory,
                params
            }}/>
            <ZoomPanel {...{
                pushToHistory,
                params,
            }}/>
            <EquationDialog {...{editingEquationIndex, setEditingEquationIndex, pushToHistory, params}}/>
            <InfoDialog {...{pushToHistory, params}}/>
        </AppWrapper>;
    }
}




