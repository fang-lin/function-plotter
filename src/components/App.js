import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { app, drag_start, dragging } from './App.css';
import PreloadImages from './PreloadImages';
import Stage from './Stage';
import StateBar from './StateBar';
import CrossLine from './CrossLine';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';
import { deviceRatio, DRAG_EVENTS, getClientXY } from '../utilities';

export default observer(class App extends Component {

  constructor(props) {
    super(props);
    this.app = createRef();
    this.state = {
      cursor: null,
      isDragging: false,
    };
  }

  updateStageRect() {
    this.props.stage.updateStageRect(this.app.current.getBoundingClientRect());
  }

  onDragStart = event => {
    this.setState({
      cursor: getClientXY(event)
    });
    window.addEventListener(DRAG_EVENTS.MOVE, this.onDragging);
  };

  onDragging = event => {
    const { clientX, clientY } = getClientXY(event);
    this.props.stage.updateTransform(clientX - this.state.cursor.clientX, clientY - this.state.cursor.clientY);
    this.setState({ isDragging: true });
  };

  onDragEnd = event => {
    window.removeEventListener(DRAG_EVENTS.MOVE, this.onDragging);
    const { originX, originY } = this.props.stage;
    const { clientX, clientY } = getClientXY(event);
    this.props.stage.updateOrigin(
      originX + (clientX - this.state.cursor.clientX) * deviceRatio,
      originY + (clientY - this.state.cursor.clientY) * deviceRatio
    );
    this.props.stage.updateTransform(0, 0);
    this.setState({ cursor: null, isDragging: false });
  };

  componentDidMount() {
    this.updateStageRect();

    const { originX, originY, updateOriginInCenter } = this.props.stage;
    const { updateCursor } = this.props.states;
    isNaN(originX) && isNaN(originY) && updateOriginInCenter();

    window.addEventListener('resize', () => this.updateStageRect());
    window.addEventListener(DRAG_EVENTS.START, this.onDragStart);
    window.addEventListener(DRAG_EVENTS.END, this.onDragEnd);

    window.addEventListener('mousemove', event => {
      const { clientX, clientY } = getClientXY(event);
      updateCursor(clientX, clientY);
    });
  }

  render() {
    const { states, stage } = this.props;
    const { cursor, isDragging } = this.state;
    const { showCoord } = states;
    return <div className={ `${app} ${cursor ? (isDragging ? dragging : drag_start) : ''}` } ref={ this.app }>
      <PreloadImages/>
      <Stage { ...{ stage } }/>
      { showCoord && <CrossLine { ...{ states, stage } }/> }
      <StateBar/>
      <ViewPanel { ...{ states, stage } }/>
      <ZoomPanel { ...{ stage } }/>
    </div>
  }
});
