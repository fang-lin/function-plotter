import React, {Component, RefObject} from 'react';
import debounce from 'lodash/debounce';
import {AppWrapper} from './AppWrapper';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    DragState,
    getCenteredOrigin,
    getStageSize,
    Size,
    Equation,
    decodeParams,
    PathParams,
    getClient,
    DragEvents,
    ConvertedParams,
    encodeParams,
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
    equations: Equation[];
    equation: any;
    client: Coordinate;
}

export class App extends Component<RouteComponentProps<PathParams> & any, State> {
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
            equation: {fx: 'Math.sin(x)', color: '#062', displayed: true},
            equations: [{
                fx: 'y = asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * asd 3 jdsjdhg sdj hsd fjh ds7 8 234 56 @ # $ %^ & * ',
                color: '#f90',
                displayed: true
            }, {
                fx: 'Math.sin(x)',
                color: '#009',
                displayed: true
            }, {
                fx: 'Math.sin(x)',
                color: '#859',
                displayed: true
            }, {
                fx: 'Math.sin(x)',
                color: '#899',
                displayed: true
            }],
            client: [0, 0]
        };
    }

    resetSize = () => this.setState({
        size: (getStageSize(this.appRef.current))
    });

    setCursor = (cursor: Coordinate) => this.setState({cursor});

    setEquations = () => {

    };

    setRedrawing = (redrawing: boolean) => {
        this.setState({redrawing});
    };

    onResizing = debounce(this.resetSize, 200);
    onMoving = (event: DragEvent) => this.setCursor(getClient(event));

    onDragStart = (event: DragEvent) => {
        console.log('<<<<<');
        this.setState({
            client: getClient(event),
            dragState: DragState.start
        });
        window.addEventListener(DragEvents[DragState.moving], this.onDragging);
        window.addEventListener(DragEvents[DragState.end], this.onDragEnd);
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
        const {ORIGIN} = decodeParams(this.props.match.params);

        this.pushToHistory({
            ORIGIN: [
                ORIGIN[0] + _client[0] - this.state.client[0],
                ORIGIN[1] + _client[1] - this.state.client[1]
            ]
        });
        this.setState({
            transform: [0, 0],
            dragState: DragState.end,
            client: [0, 0]
        });
        window.removeEventListener(DragEvents[DragState.moving], this.onDragging);
        window.removeEventListener(DragEvents[DragState.end], this.onDragEnd);
    };

    pushToHistory = (params: Partial<ConvertedParams>) => {
        this.props.history.push(combineURL({...this.props.match.params, ...encodeParams(params)}));
    };

    componentDidMount() {
        this.resetSize();
        window.addEventListener('resize', this.onResizing);
        window.addEventListener(DragEvents[DragState.moving], this.onMoving);
        window.addEventListener(DragEvents[DragState.start], this.onDragStart);

        const {SHOW_COORDINATE, ORIGIN} = decodeParams(this.props.match.params);

        if (SHOW_COORDINATE && this.state.dragState === DragState.end) {
            window.addEventListener('mousemove', this.onMoving);
        }

        if (isNaN(ORIGIN[0]) || isNaN(ORIGIN[1])) {
            this.pushToHistory({ORIGIN: getCenteredOrigin(getStageSize(this.appRef.current))});
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizing);
        window.removeEventListener(DragEvents[DragState.moving], this.onMoving);
        window.removeEventListener(DragEvents[DragState.start], this.onDragStart);
        // window.removeEventListener(DragEvents[DragState.end], this.onDragEnd);
    }

    render() {
        const params = decodeParams(this.props.match.params);
        const {dragState, size, transform, cursor, redrawing, equations, equation} = this.state;
        const {setRedrawing, setEquations, pushToHistory} = this;

        return <AppWrapper {...{dragState}} ref={this.appRef}>
            <PreloadImages/>
            <Stage {...{size, transform, setRedrawing, params}}/>
            {params.SHOW_COORDINATE && <CrossLine {...{cursor, size}}/>}
            <StateBar {...{params, cursor, redrawing}}/>
            <EquationPanel {...{
                equations,
                setEquations,
                pushToHistory,
                params,
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
            <EquationDialog {...{equation, setEquations, pushToHistory, params}}/>
            <InfoDialog {...{pushToHistory, params}}/>
        </AppWrapper>;
    }
}




