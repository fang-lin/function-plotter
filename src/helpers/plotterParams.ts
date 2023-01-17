import {FunctionEquation} from '../services/FunctionEquation';
import {ParametricEquation} from '../services/ParametricEquation';
import range from 'lodash/range';
import {Coordinate} from '../pages/Plotter';
import {Equations} from '../services/Equations';

const paramsSegments: Array<keyof OriginalParams> = ['scaleIndex', 'originX', 'originY', 'toggles', 'selectedEquationIndex', 'editingEquationIndex', 'equations'];

export function parseToggle(toggle: string): boolean {
    return toggle === '1';
}

export function stringifyToggle(toggle: boolean): string {
    return toggle ? '1' : '0';
}

export interface ParsedParams {
    scale: number;
    origin: Coordinate;
    equations: Equations<FunctionEquation | ParametricEquation>;
    selectedEquationIndex: number;
    editingEquationIndex: number;
    expandEquationPanel: boolean;
    expandStateBar: boolean;
    displayInfoDialog: boolean;
    showCrossCursor: boolean;
    isSmooth: boolean;
    isBold: boolean;
}

export type OriginalParams = {
    scaleIndex: string;
    selectedEquationIndex: string;
    editingEquationIndex: string;
    originX: string;
    originY: string;
    equations: string;
    toggles: string;
}

export const scaleRange: number[] = range(2, 26).map(scale => 1.4142135623730951 ** scale);

export function getScaleValue(scaleIndex: number): number {
    return scaleRange[scaleIndex];
}

export function getScaleIndex(scale: number): number {
    const index = scaleRange.indexOf(scale);
    return index > -1 ? index : 0;
}

export function parseParams(params: OriginalParams): ParsedParams {
    const {
        scaleIndex,
        selectedEquationIndex,
        editingEquationIndex,
        originX,
        originY,
        equations,
        toggles
    } = params;

    const [
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        showCrossCursor,
        isSmooth,
        isBold
    ] = toggles.split('');

    return {
        scale: getScaleValue(parseInt(scaleIndex)),
        origin: [parseFloat(originX), parseFloat(originY)],
        showCrossCursor: parseToggle(showCrossCursor),
        isSmooth: parseToggle(isSmooth),
        isBold: parseToggle(isBold),
        equations: Equations.parse(equations),
        expandEquationPanel: parseToggle(expandEquationPanel),
        expandStateBar: parseToggle(expandStateBar),
        displayInfoDialog: parseToggle(displayInfoDialog),
        selectedEquationIndex: parseInt(selectedEquationIndex),
        editingEquationIndex: parseInt(editingEquationIndex)
    };
}

export function stringifyParams(params: ParsedParams): OriginalParams {
    const {
        scale,
        origin,
        showCrossCursor,
        isSmooth,
        isBold,
        expandEquationPanel,
        expandStateBar,
        displayInfoDialog,
        equations,
        selectedEquationIndex,
        editingEquationIndex
    } = params;

    return {
        scaleIndex: getScaleIndex(scale).toString(),
        selectedEquationIndex: selectedEquationIndex.toString(),
        editingEquationIndex: editingEquationIndex.toString(),
        originX: origin[0].toString(),
        originY: origin[1].toString(),
        equations: equations.stringify(),
        toggles: [
            expandEquationPanel,
            expandStateBar,
            displayInfoDialog,
            showCrossCursor,
            isSmooth,
            isBold
        ].map(stringifyToggle).join('')
    };
}

export enum Page {
    plotter = '/plotter',
    home = '/',
}

export function combinePathToURL(params: OriginalParams): string {
    return `${Page.plotter}/${paramsSegments.map(segment => params[segment]).join('/')}`;
}

export const defaultParams: OriginalParams = {
    scaleIndex: '12',
    selectedEquationIndex: '-1',
    editingEquationIndex: '-2',
    originX: '0',
    originY: '0',
    equations: '-',
    toggles: screen.width > 1024 ? '110011' : '000011',
};

export function routerPath(): string {
    return `${Page.plotter}/${paramsSegments.map(segment => `:${segment}`).join('/')}`;
}
