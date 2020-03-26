import React, {Component, RefObject} from 'react';
import debounce from 'lodash/debounce';
import {AppWrapper} from './AppWrapper';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    DragState,
    getCenteredOrigin,
    getStageSize,
    Size,
    parseParams,
    OriginalParams,
    getClient,
    DragEvents,
    ParsedParams,
    stringifyParams,
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

export class App extends Component<RouteComponentProps<OriginalParams> & any, State> {
    private readonly appRef: RefObject<HTMLDivElement>;

    constructor(props: any) {
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

    resetSize = () => this.setState({
        size: (getStageSize(this.appRef.current))
    });

    setCursor = (cursor: Coordinate) => this.setState({cursor});

    setEditingEquationIndex = (editingEquationIndex: number) => this.setState({editingEquationIndex});

    setRedrawing = (redrawing: boolean) => {
        this.setState({redrawing});
    };

    onResizing = debounce(this.resetSize, 200);
    onMoving = (event: DragEvent) => this.setCursor(getClient(event));

    onDragStart = (event: DragEvent) => {
        this.setState({
            client: getClient(event),
            dragState: DragState.start
        });
        window.addEventListener(DragEvents[DragState.moving], this.onDragging);
        window.addEventListener(DragEvents[DragState.end], this.onDragEnd);
        window.removeEventListener(DragEvents[DragState.moving], this.onMoving);
    };

    onDragging = (event: DragEvent) => {
        const _client = getClient(event);
        const {client} = this.state;

        this.setState({
            transform: [_client[0] - client[0], _client[1] - client[1]],
            dragState: DragState.moving
        });
    };

    onDragEnd = (event: DragEvent) => {
        const _client = getClient(event);
        const {origin} = parseParams(this.props.match.params);

        this.pushToHistory({
            origin: [
                origin[0] + _client[0] - this.state.client[0],
                origin[1] + _client[1] - this.state.client[1]
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

    pushToHistory = (params: Partial<ParsedParams>) => {
        this.props.history.push(combineURL({...this.props.match.params, ...stringifyParams(params)}));
    };

    componentDidMount() {
        this.resetSize();
        window.addEventListener('resize', this.onResizing);
        window.addEventListener(DragEvents[DragState.moving], this.onMoving);
        window.addEventListener(DragEvents[DragState.start], this.onDragStart);
        const {origin} = parseParams(this.props.match.params);

        if (isNaN(origin[0]) || isNaN(origin[1])) {
            this.pushToHistory({origin: getCenteredOrigin(getStageSize(this.appRef.current))});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizing);
        window.removeEventListener(DragEvents[DragState.moving], this.onMoving);
        window.removeEventListener(DragEvents[DragState.start], this.onDragStart);
    }

    render() {
        const params = parseParams(this.props.match.params);
        const {dragState, size, transform, cursor, redrawing, editingEquationIndex} = this.state;
        const {setRedrawing, pushToHistory, setEditingEquationIndex} = this;

        return <AppWrapper {...{dragState}} ref={this.appRef}>
            <PreloadImages/>
            <Stage {...{cursor, size, transform, setRedrawing, params}}/>
            <StateBar {...{params, cursor, redrawing}}/>
            <EquationPanel {...{
                pushToHistory,
                params,
                setEditingEquationIndex
            }}/>
            <ViewPanel {...{
                getCenteredOrigin,
                pushToHistory,
                params,
                size
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




