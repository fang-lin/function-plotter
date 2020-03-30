import {deviceRatio, Size} from './App.function';

export const primary = [0, 2, 4, 6, 8, 10, 12, 14];
const cellSize = 10;
const width = primary.length ** 2 * cellSize;
const height = primary.length * cellSize;

export const toHex = (n: number): string => n.toString(16);
export const padding = 16;
export const size: Size = [width, height];

export const attributes = {
    width: width * deviceRatio,
    height: height * deviceRatio
};

export const pickerAttributes = {
    width: (width + padding * 2) * deviceRatio,
    height: (height + padding * 2) * deviceRatio
};
