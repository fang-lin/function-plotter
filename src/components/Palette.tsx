import React, {Dispatch, MouseEvent, SetStateAction, useEffect, useRef} from 'react';
import Color from 'color';
import debounce from 'lodash/debounce';
import {PaletteWrapper, PaletteCanvas, PickerCanvas, CoverCanvas} from './Palette.style';
import {Coordinate, deviceRatio, Equation} from './App.function';
import range from 'lodash/range';
import {withCanvasContext} from "./Stage.function";

const toHex = (n: number): string => n.toString(16);
const primary = range(0, 16, 2);
const colors = primary.map(r => primary.map(g => primary.map(b => `#${toHex(r)}${toHex(g)}${toHex(b)}`)));

console.log(colors);

export interface PaletteProps {
    equationColor: string;
    setEquationColor: Dispatch<SetStateAction<string>>
}

const width = 640;
const height = 80;

const attributes = {
    width: width * deviceRatio,
    height: height * deviceRatio
};
const style = {
    width: `${width}px`,
    height: `${height}px`
};

const padding = 16;

const attributes2 = {
    width: (width + padding * 2) * deviceRatio,
    height: (height + padding * 2) * deviceRatio
};
const style2 = {
    width: `${width + padding * 2}px`,
    height: `${height + padding * 2}px`,
    top: `-${padding}px`,
    left: `-${padding}px`,
};

export const Palette = (props: PaletteProps) => {
    const paletteCanvasRef: any = useRef<HTMLCanvasElement>();
    const coverCanvasRef: any = useRef<HTMLCanvasElement>();

    useEffect(() => {
        withCanvasContext(paletteCanvasRef.current, context => {
            primary.map((r, rIndex) => primary.map((g, gIndex) => primary.map((b, bIndex) => {
                context.fillStyle = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
                context.fillRect(
                    (rIndex * 8 + gIndex) * 10 * deviceRatio,
                    bIndex * 10 * deviceRatio,
                    deviceRatio * 10,
                    deviceRatio * 10
                );
            })));
        });
    }, []);

    const onMouseMove = (event: MouseEvent<Element>) => {
        const {clientX, clientY} = event;
        const {left, top} = event.currentTarget.getBoundingClientRect();
        const position = [clientX - left, clientY - top];
        withCanvasContext(coverCanvasRef.current, context => {
            const bIndex = position[1] / 10 | 0;
            const rIndex = position[0] / 10 / 8 | 0;
            const gIndex = (position[0] / 10 | 0) - 8 * rIndex;
            const color = `#${toHex(rIndex * 2)}${toHex(gIndex * 2)}${toHex(bIndex * 2)}`;
            context.clearRect(0, 0, (width + padding * 2) * deviceRatio, (height + padding * 2) * deviceRatio);
            context.beginPath();
            context.fillStyle = '#666';
            context.arc(
                ((rIndex * 8 + gIndex) * 10 + 5 + padding) * deviceRatio,
                (bIndex * 10 + 5 + padding) * deviceRatio,
                10 * deviceRatio, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.fillStyle = '#fff';
            context.arc(
                ((rIndex * 8 + gIndex) * 10 + 5 + padding) * deviceRatio,
                (bIndex * 10 + 5 + padding) * deviceRatio,
                9 * deviceRatio, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.fillStyle = color;
            context.arc(
                ((rIndex * 8 + gIndex) * 10 + 5 + padding) * deviceRatio,
                (bIndex * 10 + 5 + padding) * deviceRatio,
                8 * deviceRatio, 0, 2 * Math.PI);
            context.fill();
        });
    };

    const {setEquationColor} = props;

    return <PaletteWrapper>
        <PaletteCanvas ref={paletteCanvasRef} {...attributes} {...{style}}/>
        <PickerCanvas ref={coverCanvasRef} {...attributes2} style={style2}/>
        <CoverCanvas onMouseMove={onMouseMove} {...{style}}/>
    </PaletteWrapper>;
};
