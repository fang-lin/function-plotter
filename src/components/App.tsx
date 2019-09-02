import React, {Component, RefObject} from 'react';
import {observer} from 'mobx-react';
import debounce from 'lodash/debounce';
import {app, drag_start, dragging} from './App.style.ts';
import PreloadImages from './PreloadImages';
import Stage from './Stage';
import StateBar from './StateBar';
import CrossLine from './CrossLine';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';
import {draggingEvents, getClientXY} from '../services/utilities';

export type Coordinate = [number, number];

export interface AppProps {
    stage: any;

}

export interface AppState {
    cursorCoordinate: Coordinate;
    isDragging: boolean;
}

@observer
export class App extends Component<AppProps, AppState> {

    myRef: RefObject<HTMLDivElement> = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            cursorCoordinate: [NaN, NaN],
            isDragging: false,
        };
        this.myRef = React.createRef();
    }

    updateStageRect = () => {
        this.props.stage.updateStageRect(this.refs.app.getBoundingClientRect());
    };

    onDragStart = event => {
        this.setState({
            cursorCoordinate: getClientXY(event)
        });
        window.addEventListener(DRAG_EVENTS.MOVE, this.onDragging);
    };

    onDragging = event => {
        const {clientX, clientY} = getClientXY(event);
        this.props.stage.updateTransform(clientX - this.state.cursor.clientX, clientY - this.state.cursor.clientY);
        this.setState({isDragging: true});
    };

    onDragEnd = event => {
        window.removeEventListener(DRAG_EVENTS.MOVE, this.onDragging);
        const {stage, equations} = this.props;
        const {originX, originY, updateOrigin, updateTransform} = stage;
        const {clientX, clientY} = getClientXY(event);
        updateOrigin(
            originX + (clientX - this.state.cursor.clientX),
            originY + (clientY - this.state.cursor.clientY)
        );
        updateTransform(0, 0);
        equations.redraw();
        this.setState({cursor: null, isDragging: false});
    };

    componentDidMount() {
        this.updateStageRect();
        const {stage: {originX, originY, updateOriginInCenter}, states: {updateCursor}} = this.props;
        isNaN(originX) && isNaN(originY) && updateOriginInCenter();

        window.addEventListener('resize', debounce(this.updateStageRect, 200));
        window.addEventListener(draggingEvents.start, this.onDragStart);
        window.addEventListener(draggingEvents.end, this.onDragEnd);

        window.addEventListener('mousemove', event => {
            updateCursor(...getClientXY(event));
        });
    }

    render() {
        const {states, stage, equations} = this.props;
        const {cursor, isDragging} = this.state;
        const {showCoord} = states;
        return <div className={`${app} ${cursor ? (isDragging ? dragging : drag_start) : ''}`} ref={this.myRef}>
            <PreloadImages/>
            <Stage {...{states, stage, equations}}/>
            {showCoord && <CrossLine {...{states, stage}}/>}
            <StateBar {...{equations, stage, states}}/>
            <ViewPanel {...{states, stage}}/>
            <ZoomPanel {...{stage}}/>
        </div>;
    }
}

