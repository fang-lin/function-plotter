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
import {getClient, DRAG_EVENTS, DRAG_STATE, Coordinate, DragEvent} from '../services/utilities';
import {Stage as StageStore} from '../stores/Stage';
import {Equations as EquationsStore} from '../stores/Equations';
import {Preferences as PreferencesStore} from '../stores/Preferences';

export interface InjectedAppProps {
    stage: StageStore;
    preferences: PreferencesStore;
    equations: EquationsStore;
}

export interface AppState {
    dragState: DRAG_STATE;
    dragStartClient: Coordinate;
}

@inject('stage', 'preferences', 'equations')
@observer
export class App extends Component<{}, AppState> {
    stageRef: RefObject<HTMLDivElement> = createRef();

    constructor(props: InjectedAppProps) {
        super(props);
        this.state = {
            dragState: DRAG_STATE.END,
            dragStartClient: [NaN, NaN]
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
            dragStartClient: getClient(event),
            dragState: DRAG_STATE.START
        });
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], this.onDragging);
    };

    onDragging = (event: DragEvent) => {
        const [clientX, clientY] = getClient(event);
        const {dragStartClient} = this.state;
        this.store.stage.updateTransform([clientX - dragStartClient[0], clientY - dragStartClient[1]]);
        this.setState({dragState: DRAG_STATE.MOVING});
    };

    onDragEnd = (event: DragEvent) => {
        window.removeEventListener(DRAG_EVENTS[DRAG_STATE.MOVING], this.onDragging);
        const {stage: {origin, updateOrigin, updateTransform}, equations, preferences: {updateCursor}} = this.store;
        const {dragStartClient} = this.state;
        const client = getClient(event);
        updateCursor(client);
        updateOrigin([
            origin[0] + (client[0] - dragStartClient[0]),
            origin[1] + (client[1] - dragStartClient[1])
        ]);
        updateTransform([0, 0]);
        equations.redraw();
        this.setState({
            dragStartClient: [NaN, NaN],
            dragState: DRAG_STATE.END
        });
    };

    componentDidMount() {
        this.updateStageRect();
        const {preferences} = this.store;
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.START], this.onDragStart);
        window.addEventListener(DRAG_EVENTS[DRAG_STATE.END], this.onDragEnd);

        window.addEventListener('mousemove', event => {
            if (this.state.dragState === DRAG_STATE.END) {
                preferences.updateCursor(getClient(event));
            }
        });
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
