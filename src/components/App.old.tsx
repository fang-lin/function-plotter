import React, {Component, RefObject, createRef} from 'react';
import debounce from 'lodash/debounce';
import {GlobalStyle, AppStyle} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {getClient, DRAG_EVENTS, DRAG_STATE, Coordinate, DragEvent} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';

export interface AppProps {
    stage: StageStore;
    equations: EquationsStore;
}

export interface AppState {
    dragState: DRAG_STATE;
    dragStartClient: Coordinate;
    refreshID: number
}

export class App extends Component<AppProps, AppState> {
    appRef: RefObject<HTMLDivElement> = createRef();

    constructor(props: AppProps) {
        super(props);
        this.state = {
            dragState: DRAG_STATE.END,
            dragStartClient: [NaN, NaN],
            refreshID: 0
        };
        this.appRef = React.createRef();
    }

    refresh(callback?: () => void) {
        this.setState({
            refreshID: this.state.refreshID + 1
        }, callback);
    }

    redraw = () => {
        const {stage, equations} = this.props;
        this.refresh(() => {
            stage.redraw();
            equations.redraw();
        });
    };

    updateStageSize = () => {
        if (this.appRef.current) {
            const {width, height} = this.appRef.current.getBoundingClientRect();
            const {stage, equations} = this.props;
            stage.updateStageSize([width, height]);
            stage.updateOriginInCenter();
            this.redraw();
        }
    };

    onDragStart = (event: DragEvent) => {
        this.setState({
            dragStartClient: getClient(event),
            dragState: DRAG_STATE.START
        });
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], this.onDragging);
    };

    onDragging = (event: DragEvent) => {
        const [clientX, clientY] = getClient(event);
        const {dragStartClient} = this.state;
        this.props.stage.updateTransform([clientX - dragStartClient[0], clientY - dragStartClient[1]]);
        this.setState({dragState: DRAG_STATE.MOVING});
    };

    onDragEnd = (event: DragEvent) => {
        window.removeEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], this.onDragging);
        const {origin, updateOrigin, updateTransform, updateCursor} = this.props.stage;
        const {dragStartClient} = this.state;
        const client = getClient(event);
        updateCursor(client);
        updateTransform([0, 0]);
        updateOrigin([
            origin[0] + (client[0] - dragStartClient[0]),
            origin[1] + (client[1] - dragStartClient[1])
        ]);
        this.redraw();
        this.setState({
            dragStartClient: [NaN, NaN],
            dragState: DRAG_STATE.END
        });
    };

    componentDidMount() {
        this.updateStageSize();
        const {stage} = this.props;
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.START], this.onDragStart);
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.END], this.onDragEnd);

        window.addEventListener('mousemove', event => {
            if (this.state.dragState === DRAG_STATE.END) {
                stage.updateCursor(getClient(event));
                this.refresh();
            }
        });
        window.addEventListener('resize', debounce(this.updateStageSize, 200));
    }

    render() {
        const {stage, equations} = this.props;
        const {showCoordinate} = stage;
        const {dragState} = this.state;
        return <AppStyle dragState={dragState} ref={this.appRef}>
            <PreloadImages/>
            <Stage {...this.props}/>
            {showCoordinate && this.state.dragState === DRAG_STATE.END && <CrossLine stage={stage}/>}
            <StateBar  {...this.props}/>
            <ViewPanel  {...this.props} redraw={this.redraw}/>
            <ZoomPanel stage={stage}
                       equations={equations} redraw={this.redraw}/>
            <GlobalStyle/>
        </AppStyle>;
    }
}
