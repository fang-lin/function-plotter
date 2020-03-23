import React, {Component, MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import flowRight from 'lodash/flowRight';
import {AppWrapper} from './AppWrapper';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {
    Coordinate,
    addEventListeners,
    DragState,
    removeEventListeners,
    getCenteredOrigin,
    getStageSize,
    onDragEndHOF,
    onDraggingHOF,
    onDragStartHOF,
    onMoving,
    Size, Equation, decodeParams, Params, paramsToPath, getClient, DragEvents
} from './App.function';
import {EquationPanel} from './EquationPanel';
import {EquationDialog} from './EquationDialog';
import {InfoDialog} from './InfoDialog';
import {RouteComponentProps, useHistory, useParams} from 'react-router-dom';


let params: Params;
let onDragStart: any;
let onDragEnd: any;

export const App2 = () => {
    const appRef: MutableRefObject<any> = useRef<HTMLDivElement>();

    const {ZOOM_INDEX, ORIGIN, SHOW_COORDINATE, EQUATIONS, IS_BOLD, SMOOTH} = decodeParams(useParams<Params>());
    params = useParams<Params>();
    const history = useHistory();

    const [dragState, setDragState] = useState<DragState>(DragState.end);
    const [, setClient] = useState<Coordinate>([NaN, NaN]);
    const [transform, setTransform] = useState<Coordinate>([0, 0]);
    const [cursor, setCursor] = useState<Coordinate>([NaN, NaN]);
    const [size, setSize] = useState<Size>([0, 0]);
    const [redrawing, setRedrawing] = useState<boolean>(false);

    const [equations, setEquations] = useState<Equation[]>();

    const equation = {fx: 'Math.sin(x)', color: '#062', displayed: true};

    const [equationDialogDisplay, setEquationDialogDisplay] = useState<boolean>(false);
    const [infoDialogDisplay, setInfoDialogDisplay] = useState<boolean>(false);
    const [expandEquationPanel, setExpandEquationPanel] = useState<boolean>(true);

    useEffect(() => {
        const onMoving = flowRight([setCursor, getClient]);
        if (SHOW_COORDINATE && dragState === DragState.end) {
            window.addEventListener('mousemove', onMoving);
        }
        return () => {
            window.removeEventListener('mousemove', onMoving);
        };

    }, [SHOW_COORDINATE]);

    useEffect(() => {
        const toPath = paramsToPath(params);
        const {ORIGIN} = decodeParams(params);
        const onDragging = onDraggingHOF({setTransform, setDragState, setClient});
        onDragStart = onDragStartHOF({setClient, setDragState, onDragging});
        onDragEnd = onDragEndHOF({
            setTransform,
            ORIGIN,
            toPath,
            history,
            setDragState,
            setClient,
            onDragging
        });

    }, [ZOOM_INDEX, ORIGIN]);


    useEffect(() => {
        addEventListeners({onDragStart, onDragEnd});
        return () => {
            removeEventListeners({onDragStart, onDragEnd});
        };
    }, []);


    useEffect(() => {
        const resetSize = () => setSize(getStageSize(appRef.current));
        resetSize();
        window.addEventListener('resize', debounce(resetSize, 200));
    }, []);

    useEffect(() => {
        const onResizing = debounce(() => setSize(getStageSize(appRef.current)), 200);

        window.addEventListener('resize', onResizing);

        return () => {
            window.removeEventListener('resize', onResizing);
        };
    }, []);

    return <AppWrapper {...{dragState}} ref={appRef}>
        <PreloadImages/>
        <Stage {...{size, transform, setRedrawing, SMOOTH, IS_BOLD, ZOOM_INDEX, ORIGIN}}/>
        {SHOW_COORDINATE && <CrossLine {...{cursor, size}}/>}
        <StateBar {...{ORIGIN, ZOOM_INDEX, cursor, redrawing}}/>
        <EquationPanel {...{
            equations,
            setEquations,
            setEquationDialogDisplay,
            expandEquationPanel,
            setExpandEquationPanel,
            setInfoDialogDisplay
        }}/>
        <ViewPanel {...{
            getCenteredOrigin,
            size
        }}/>
        <ZoomPanel/>
        <EquationDialog {...{equation, setEquations, equationDialogDisplay, setEquationDialogDisplay}}/>
        <InfoDialog {...{infoDialogDisplay, setInfoDialogDisplay}}/>
    </AppWrapper>;
};


interface State {
    dragState: DragState;
    size: Size;
    redrawing: boolean;
    transform: Coordinate;
    cursor: Coordinate;
    equations: Equation[];
    equation: any;
    equationDialogDisplay: boolean;
    expandEquationPanel: boolean;
    infoDialogDisplay: boolean;
    client: Coordinate;
}


export class App extends Component<RouteComponentProps & any, State> {
    private readonly appRef: RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);

        console.log(props);

        this.appRef = React.createRef();

        const {ZOOM_INDEX, ORIGIN, SHOW_COORDINATE, EQUATIONS, IS_BOLD, SMOOTH} = decodeParams(props.match.params);

        this.state = {
            dragState: DragState.end,
            size: [0, 0],
            redrawing: false,
            transform: [0, 0],
            cursor: [0, 0],
            equation: {fx: 'Math.sin(x)', color: '#062', displayed: true},
            equationDialogDisplay: false,
            expandEquationPanel: false,
            infoDialogDisplay: false,
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

    setEquationDialogDisplay = (equationDialogDisplay: boolean) => this.setState({
        equationDialogDisplay
    });

    setExpandEquationPanel = (expandEquationPanel: boolean) => this.setState({
        expandEquationPanel
    });

    setInfoDialogDisplay = (infoDialogDisplay: boolean) => this.setState({
        infoDialogDisplay
    });

    setRedrawing = (redrawing: boolean) => {
        this.setState({redrawing});
    };

    onResizing = debounce(this.resetSize, 200);
    onMoving = (event: any) => this.setCursor(getClient(event));

    onDragStart = (event: any) => {
        this.setState({
            client: getClient(event),
            dragState: DragState.start
        });
        window.addEventListener(DragEvents[DragState.moving], this.onDragging);
    };

    onDragging = (event: any) => {
        const _client = getClient(event);
        const {client} = this.state;

        this.setState({
            transform: [_client[0] - client[0], _client[1] - client[1]],
            dragState: DragState.moving
        });
    };
    onDragEnd = (event: any) => {
        window.removeEventListener(DragEvents[DragState.moving], this.onDragging);
        const _client = getClient(event);


        this.setState({
            transform: [0, 0],
            dragState: DragState.end,
            client: [0, 0]
        });

        const params: Params = decodeParams(this.props.match.params);
        const {ORIGIN} = decodeParams(this.props.match.params);

        this.props.history.push(paramsToPath(params, {
            ORIGIN: [
                ORIGIN[0] + _client[0] - this.state.client[0],
                ORIGIN[1] + _client[1] - this.state.client[1]
            ]
        }));

    };

    componentDidMount() {
        this.resetSize();
        window.addEventListener('resize', this.onResizing);
        window.addEventListener('resize', this.onDragStart);
        window.addEventListener('resize', this.onDragEnd);

        const {SHOW_COORDINATE} = decodeParams(this.props.match.params);
        if (SHOW_COORDINATE && this.state.dragState === DragState.end) {
            window.addEventListener('mousemove', this.onMoving);
        }
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizing);
        window.removeEventListener('mousemove', this.onMoving);
    }

    render() {
        const {ZOOM_INDEX, ORIGIN, SHOW_COORDINATE, EQUATIONS, IS_BOLD, SMOOTH} = decodeParams(this.props.match.params);
        const {dragState, size, transform, cursor, redrawing, equations, equationDialogDisplay, expandEquationPanel, equation, infoDialogDisplay} = this.state;
        const {setRedrawing, setEquations, setEquationDialogDisplay, setExpandEquationPanel, setInfoDialogDisplay} = this;

        return <AppWrapper {...{dragState}} ref={this.appRef}>
            <PreloadImages/>
            <Stage {...{size, transform, setRedrawing, SMOOTH, IS_BOLD, ZOOM_INDEX, ORIGIN}}/>
            {SHOW_COORDINATE && <CrossLine {...{cursor, size}}/>}
            <StateBar {...{ORIGIN, ZOOM_INDEX, cursor, redrawing}}/>
            <EquationPanel {...{
                equations,
                setEquations,
                setEquationDialogDisplay,
                expandEquationPanel,
                setExpandEquationPanel,
                setInfoDialogDisplay
            }}/>
            <ViewPanel {...{
                getCenteredOrigin,
                size
            }}/>
            <ZoomPanel/>
            <EquationDialog {...{equation, setEquations, equationDialogDisplay, setEquationDialogDisplay}}/>
            <InfoDialog {...{infoDialogDisplay, setInfoDialogDisplay}}/>
        </AppWrapper>;
    }
}




