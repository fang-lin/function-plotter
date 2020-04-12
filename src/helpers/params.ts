import {Equations} from '../services/Equations';
import {FunctionEquation} from '../services/FunctionEquation';
import {ParametricEquation} from '../services/ParametricEquation';
import range from 'lodash/range';
import {Coordinate} from '../components/App/App.function';

export function parseToggle(toggle: string): boolean {
    return toggle === '1';
}

export function stringifyToggle(toggle: boolean): string {
    return toggle ? '1' : '0';
}

export function utoa(code: string): string {
    return window.btoa(unescape(encodeURIComponent(code)));
}

export function atou(code: string): string {
    return decodeURIComponent(escape(window.atob(code)));
}

export interface ParsedParams {
    scale: number;
    origin: Coordinate;
    equations: Equations<FunctionEquation | ParametricEquation>;
    selectedEquationIndex: number;
    displayEquationDialog: boolean;
    expandEquationPanel: boolean;
    expandStateBar: boolean;
    displayInfoDialog: boolean;
    showCrossCursor: boolean;
    isSmooth: boolean;
    isBold: boolean;
}

export type OriginalParams = {
    scaleLevel: string;
    selectedEquationIndex: string;
    originX: string;
    originY: string;
    equations: string;
    toggles: string;
}
export const scaleRange: number[] = range(2, 26).map(scale => 1.4142135623730951 ** scale);

export function parseScale(scaleLevel: number): number {
    return scaleRange[scaleLevel - 1];
}

export function getScaleLevel(scale: number): number {
    return scaleRange.indexOf(scale) + 1;
}

export function parseParams(params: OriginalParams): ParsedParams {
    const {
        scaleLevel,
        selectedEquationIndex,
        originX,
        originY,
        equations,
        toggles
    } = params;

    const [
        displayEquationDialog,
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        showCrossCursor,
        isSmooth,
        isBold
    ] = toggles.split('');

    return {
        scale: parseScale(parseInt(scaleLevel)),
        origin: [parseFloat(originX), parseFloat(originY)],
        showCrossCursor: parseToggle(showCrossCursor),
        isSmooth: parseToggle(isSmooth),
        isBold: parseToggle(isBold),
        equations: Equations.parse(equations),
        displayEquationDialog: parseToggle(displayEquationDialog),
        expandEquationPanel: parseToggle(expandEquationPanel),
        expandStateBar: parseToggle(expandStateBar),
        displayInfoDialog: parseToggle(displayInfoDialog),
        selectedEquationIndex: parseInt(selectedEquationIndex)
    };
}

export function stringifyParams(params: ParsedParams): OriginalParams {
    const {
        scale,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        displayEquationDialog,
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        equations,
        selectedEquationIndex
    } = params;

    return {
        scaleLevel: getScaleLevel(scale).toString(),
        selectedEquationIndex: selectedEquationIndex.toString(),
        originX: origin[0].toString(),
        originY: origin[1].toString(),
        equations: equations.stringify(),
        toggles: [
            displayEquationDialog,
            expandEquationPanel,
            expandStateBar,
            displayInfoDialog,
            showCrossCursor,
            isSmooth,
            isBold
        ].map(stringifyToggle).join('')
    };
}

export function combineURL(params: OriginalParams, partialParams: Partial<ParsedParams>): string {
    const {
        scaleLevel,
        originX,
        originY,
        equations,
        toggles,
        selectedEquationIndex
    } = stringifyParams({...parseParams(params), ...partialParams});

    return `/${scaleLevel}/${originX}/${originY}/${toggles}/${selectedEquationIndex}/${equations}`;
}
