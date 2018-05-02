import { observable } from 'mobx';

const deviceRatio = window.devicePixelRatio || 1;

export const states = observable({
  isSmooth: true,
  showCoord: false,
  switchSmooth() {
    states.isSmooth = !states.isSmooth;
  },
  switchCoord() {
    states.showCoord = !states.showCoord;
  }
});

export const stage = observable({
  width: 0,
  height: 0,
  deviceRatioWidth: 0,
  deviceRatioHeight: 0,
  originX: 0,
  originY: 0,
  updateStageRect(rect) {
    stage.width = rect.width;
    stage.height = rect.height;
    stage.deviceRatioWidth = rect.width * deviceRatio;
    stage.deviceRatioHeight = rect.height * deviceRatio;
  },
  setOriginInCenter() {
    stage.originX = stage.deviceRatioWidth / 2;
    stage.originY = stage.deviceRatioHeight / 2;
  }
});
