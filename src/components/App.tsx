import React, {Component, RefObject, createRef} from 'react';
import {observer, inject} from 'mobx-react';
import debounce from 'lodash/debounce';
import {GlobalStyle, AppStyle} from './App.style';
import {PreloadImages} from './PreloadImages';
import {Stage} from './Stage';
import {StateBar} from './StateBar';
import {CrossLine} from './CrossLine';
import {ViewPanel} from './ViewPanel';
import {ZoomPanel} from './ZoomPanel';
import {getClientCoordinate, DRAG_EVENTS, DragEventNames} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';
import {Preferences as PreferencesStore} from '../stores/Preferences';

export type Coordinate = [number, number];
export type Size = [number, number];

export interface InjectedAppProps {
    stage: StageStore;
    preferences: PreferencesStore;
    equations: EquationsStore;
}

export interface AppState {
    cursorCoordinate: Coordinate;
    dragState: DragEventNames;
    cursor: Coordinate;
}

@inject('stage', 'preferences', 'equations')
@observer
export class App extends Component<{}, AppState> {
    stageRef: RefObject<HTMLDivElement> = createRef();

    constructor(props: InjectedAppProps) {
        super(props);
        this.state = {
            cursorCoordinate: [NaN, NaN],
            dragState: 'END',
            cursor: [NaN, NaN]
        };
        this.stageRef = React.createRef();
    }

    get store() {
        return this.props as InjectedAppProps;
    }

    updateStageRect = () => {
        if (this.stageRef.current) {
            const {width, height} = this.stageRef.current.getBoundingClientRect();
            this.store.stage.updateStageRect([width, height]);
        }
    };

    onDragStart = (event: DragEvent) => {
        this.setState({
            cursor: getClientCoordinate(event),
            dragState: 'START'
        });
        window.addEventListener(DRAG_EVENTS.MOVING, this.onDragging);
    };

    onDragging = (event: DragEvent) => {
        const [clientX, clientY] = getClientCoordinate(event);
        const {cursor} = this.state;
        this.store.stage.updateTransform([clientX - cursor[0], clientY - cursor[1]]);
        this.setState({dragState: 'MOVING'});
    };

    onDragEnd = (event: DragEvent) => {
        window.removeEventListener(DRAG_EVENTS.MOVING, this.onDragging);
        const {stage, equations} = this.store;
        const {cursor} = this.state;
        const {origin} = stage;
        const client = getClientCoordinate(event);
        stage.updateOrigin([
            origin[0] + (client[0] - cursor[0]),
            origin[1] + (client[1] - cursor[1])
        ]);
        stage.updateTransform([0, 0]);
        equations.redraw();
        this.setState({
            cursor: [NaN, NaN],
            dragState: 'END'
        });
    };

    componentDidMount() {
        this.updateStageRect();
        const {preferences} = this.store;
        window.addEventListener(DRAG_EVENTS.START, this.onDragStart);
        window.addEventListener(DRAG_EVENTS.END, this.onDragEnd);

        window.addEventListener('mousemove', event => preferences.updateCursor(getClientCoordinate(event)));
        window.addEventListener('resize', debounce(this.updateStageRect, 200));
    }

    render() {
        const {preferences: {showCoordinate}} = this.store;
        const {dragState} = this.state;
        return <AppStyle dragState={dragState} ref={this.stageRef}>
            <PreloadImages/>
            <Stage/>
            {showCoordinate && <CrossLine/>}
            <StateBar/>
            <ViewPanel/>
            <ZoomPanel/>
            <GlobalStyle/>
        </AppStyle>;
    }
}
