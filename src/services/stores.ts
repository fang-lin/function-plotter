import {observable} from 'mobx';
import clamp from 'lodash/clamp';
import {parseZoom} from './utilities';

export const states = observable({
    isSmooth: true,
    showCoord: false,
    cursorX: NaN,
    cursorY: NaN,
    switchSmooth() {
        states.isSmooth = !states.isSmooth;
        window.requestAnimationFrame(equations.redraw);
    },
    switchCoord() {
        states.showCoord = !states.showCoord;
    },
    updateCursor(cursorX, cursorY) {
        states.cursorX = cursorX;
        states.cursorY = cursorY;
    }
});

export const stage = observable({
    width: 0,
    height: 0,
    deviceRatioWidth: 0,
    deviceRatioHeight: 0,
    originX: NaN,
    originY: NaN,
    transformX: 0,
    transformY: 0,
    zoomLevel: 8,
    rangeX: [0, 0],
    rangeY: [0, 0],
    zoom: parseZoom(8),
    updateStageRect(rect) {
        stage.width = rect.width;
        stage.height = rect.height;
        stage.updateRange();
    },
    updateOrigin(originX, originY) {
        stage.originX = originX;
        stage.originY = originY;
        stage.updateRange();
    },
    updateOriginInCenter() {
        stage.originX = stage.width / 2;
        stage.originY = stage.height / 2;
        stage.updateRange();
    },
    updateTransform(transformX, transformY) {
        stage.transformX = transformX;
        stage.transformY = transformY;
    },
    updateZoom(zoomLevel) {
        stage.zoomLevel = clamp(zoomLevel, 1, 16);
        stage.zoom = parseZoom(stage.zoomLevel);
        stage.updateRange();
    },
    updateRange() {
        const {originX, originY, width, height, zoom} = stage;
        stage.rangeX = [-originX / zoom, (width - originX) / zoom];
        stage.rangeY = [(originY - height) / zoom, originY / zoom];
        window.requestAnimationFrame(equations.redraw);
    }
});

export const equations = observable({
    equationsMatrix: [],
    isRedrawing: false,
    redraw: null,
    updateIsRedrawing(is) {
        equations.isRedrawing = is;
    },
    pushEquationsMatrix(equation) {
        if (equations.equationsMatrix[0]) {
            equations.equationsMatrix[0].matrix = equation.matrix;
        } else {
            equations.equationsMatrix[0] = equation;
        }
    },
    updateEquationsMatrix(equations) {
        equations.map(equation => {
            if (equations.equationsMatrix.find(_ => _.id === equation.id)) {
                equations.equationsMatrix = equations.equationsMatrix.length
            } else {

            }
        });
    }
});
