import {parseZoom, Size, Coordinate} from '../services/utilities';
import clamp from 'lodash/clamp';
import {Equations, Redraw, RedrawFn} from './Equations';

export class Stage implements Redraw {
    size: Size = [0, 0];
    deviceRatio: Size = [0, 0];
    origin: Coordinate = [0, 0];
    transform: Coordinate = [0, 0];
    rangeX: Size = [0, 0];
    rangeY: Size = [0, 0];
    zoomLevel: number = 8;
    zoom: number = parseZoom(8);
    isSmooth: boolean = true;
    showCoordinate: boolean = false;
    cursor: Coordinate = [NaN, NaN];

    constructor(
        private equations: Equations
    ) {
        this.equations = equations;
    }

    redraw = () => {
    };

    switchSmooth = () => {
        this.isSmooth = !this.isSmooth;
    };

    switchCoordinate = () => {
        this.showCoordinate = !this.showCoordinate;
    };

    updateCursor = (cursor: Coordinate) => {
        this.cursor = cursor;
    };

    setRedraw = (redraw: RedrawFn) => {
        this.redraw = redraw;
    };

    updateStageSize = (size: Size) => {
        this.size = size;
        this.updateRange();
    };

    updateOrigin = (origin: Coordinate) => {
        this.origin = origin;
        this.updateRange();
    };

    updateOriginInCenter = () => {
        this.origin = [this.size[0] / 2, this.size[1] / 2];
        this.updateRange();
    };

    updateTransform = (transform: Coordinate) => {
        this.transform = transform;
    };

    updateZoom = (zoomLevel: number) => {
        this.zoomLevel = clamp(zoomLevel, 1, 16);
        this.zoom = parseZoom(this.zoomLevel);
        this.updateRange();
    };

    updateRange = () => {
        const {origin, size, zoom} = this;
        this.rangeX = [-origin[0] / zoom, (size[0] - origin[0]) / zoom];
        this.rangeY = [(origin[1] - size[1]) / zoom, origin[1] / zoom];
    };
}
