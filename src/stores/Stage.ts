import {action, observable} from 'mobx';
import {parseZoom, Size, Coordinate} from '../services/utilities';
import clamp from 'lodash/clamp';

export class Stage {
    @observable size: Size = [0, 0];
    @observable deviceRatio: Size = [0, 0];
    @observable origin: Coordinate = [0, 0];
    @observable transform: Coordinate = [0, 0];
    @observable rangeX: Size = [0, 0];
    @observable rangeY: Size = [0, 0];
    @observable zoomLevel: number = 8;
    @observable zoom: number = parseZoom(8);

    @action
    updateStageRect = (rect: Size) => {
        this.size = rect;
        this.updateRange();
    };

    @action
    updateOrigin = (origin: Coordinate) => {
        this.origin = origin;
        this.updateRange();
    };

    @action
    updateOriginInCenter = () => {
        this.origin = [this.size[0] / 2, this.size[1] / 2];
        this.updateRange();
    };

    @action
    updateTransform = (transform: Coordinate) => {
        this.transform = transform;
    };

    @action
    updateZoom = (zoomLevel: number) => {
        this.zoomLevel = clamp(zoomLevel, 1, 16);
        this.zoom = parseZoom(this.zoomLevel);
        this.updateRange();
    };

    @action
    updateRange = () => {
        const {origin, size, zoom} = this;
        this.rangeX = [-origin[0] / zoom, (size[0] - origin[0]) / zoom];
        this.rangeY = [(origin[1] - size[1]) / zoom, origin[1] / zoom];
        // window.requestAnimationFrame(equations.redraw);
    };
}
