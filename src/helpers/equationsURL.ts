import {combinePathToURL, defaultParams} from './plotterParams';
import {utoa} from './codec';

export function equationsURL(equations: Array<[string, string]>, scaleIndex = 13): string {
    return combinePathToURL({
        ...defaultParams, ...{
            scaleIndex: scaleIndex.toString(),
            equations: utoa(JSON.stringify(equations.map(([equation, color]) => [equation, color, true])))
        }
    });
}