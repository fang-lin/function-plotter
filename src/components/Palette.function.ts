import {Dispatch, MouseEvent, SetStateAction} from "react";
import {withCanvasContext} from "./Stage.function";
import {deviceRatio, Size} from "./App.function";

export const toHex = (n: number): string => n.toString(16);

const toHexs = (redIndex: number, greenIndex: number, blueIndex: number): string => {
    return `#${toHex(redIndex * 2)}${toHex(greenIndex * 2)}${toHex(blueIndex * 2)}`
};
const toNavHex = (redIndex: number, greenIndex: number, blueIndex: number): string => {
    return `#${toHex(15 - redIndex * 2)}${toHex(15 - greenIndex * 2)}${toHex(15 - blueIndex * 2)}`
};

export const primary = [0, 2, 4, 6, 8, 10, 12, 14];

const cellSize = 10;
const width = primary.length ** 2 * cellSize;
const height = primary.length * cellSize;
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

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void => {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
};

export const onMouseMove = (canvas: HTMLCanvasElement, setHoveredColor: Dispatch<SetStateAction<string>>) => (event: MouseEvent<Element>) => {
    const {clientX, clientY} = event;
    const {left, top} = event.currentTarget.getBoundingClientRect();
    const position = [clientX - left, clientY - top];
    setHoveredColor((prevColor: string) => {
        const blueIndex = position[1] / cellSize | 0;
        const redIndex = position[0] / cellSize / primary.length | 0;
        const greenIndex = (position[0] / cellSize | 0) - primary.length * redIndex;
        const color = toHexs(redIndex, greenIndex, blueIndex);

        if (prevColor !== color) {
            withCanvasContext(canvas, context => {
                const x = ((redIndex * primary.length + greenIndex) * cellSize + padding) * deviceRatio;
                const y = (blueIndex * cellSize + padding) * deviceRatio;

                context.clearRect(0, 0, (width + padding * 2) * deviceRatio, (height + padding * 2) * deviceRatio);

                context.strokeStyle = toNavHex(redIndex, greenIndex, blueIndex);
                context.lineWidth = deviceRatio;
                context.strokeRect(x, y, cellSize * deviceRatio, cellSize * deviceRatio);
            });
            return color;
        }
        return prevColor;
    });
};

export const drawPalette = <Color>(canvas: HTMLCanvasElement) => {
    withCanvasContext(canvas, context => {
        primary.map((r, rIndex) => primary.map((g, gIndex) => primary.map((b, bIndex) => {
            context.fillStyle = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            context.fillRect(
                (rIndex * primary.length + gIndex) * cellSize * deviceRatio,
                bIndex * cellSize * deviceRatio,
                deviceRatio * cellSize,
                deviceRatio * cellSize
            );
        })));
    });
};
