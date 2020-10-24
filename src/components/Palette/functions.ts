import {Size} from '../../pages/Diagraph';
import random from 'lodash/random';
import deviceRatio from '../../helpers/deviceRatio';

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

export function rgbToHex(red: number, green: number, blue: number): string {
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
}

export function randomColor(): string {
    const max = primary.length - 1;
    return rgbToHex(
        primary[random(0, max)],
        primary[random(0, max)],
        primary[random(0, max)],
    );
}
