import { observable } from 'mobx';
import clamp from 'lodash/clamp';
import { deviceRatio, parseZoom } from '../utilities';


export const states = observable({
  isSmooth: true,
  showCoord: false,
  cursorX: 0,
  cursorY: 0,
  switchSmooth() {
    states.isSmooth = !states.isSmooth;
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
  zoom: parseZoom(8),
  updateStageRect(rect) {
    stage.width = rect.width;
    stage.height = rect.height;
    stage.deviceRatioWidth = rect.width * deviceRatio;
    stage.deviceRatioHeight = rect.height * deviceRatio;
  },
  updateOrigin(originX, originY) {
    stage.originX = originX;
    stage.originY = originY;
  },
  updateOriginInCenter() {
    stage.originX = stage.deviceRatioWidth / 2;
    stage.originY = stage.deviceRatioHeight / 2;
  },
  updateTransform(transformX, transformY) {
    stage.transformX = transformX;
    stage.transformY = transformY;
  },
  updateZoom(zoomLevel) {
    stage.zoomLevel = clamp(zoomLevel, 1, 16);
    stage.zoom = parseZoom(stage.zoomLevel);
  },
});
