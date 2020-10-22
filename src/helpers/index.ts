import {combinePathToURL, defaultParams} from './diagraphParams';
import {utoa} from './codec';

export * from './codec';
export * from './coordinateTransform';
export * from './diagraphParams';

export function equationsURL(equations: Array<[string, string]>, scaleIndex = 13): string {
    return combinePathToURL({
        ...defaultParams, ...{
            scaleIndex: scaleIndex.toString(),
            equations: utoa(JSON.stringify(equations.map(([equation, color]) => [equation, color, true])))
        }
    });
}