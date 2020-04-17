import {calculateFunctionEquation} from './calculateFunctionEquation';
import {isFunctionEquation} from './FunctionEquation';
import {isParametricEquation} from './ParametricEquation';
import {calculateParametricEquation} from './calculateParametricEquation';

addEventListener('message', (event: MessageEvent) => {
    const data = event.data;
    const {equation, ...rest} = data;

    if (isFunctionEquation(equation)) {
        postMessage(calculateFunctionEquation({equation, ...rest}));
    } else if (isParametricEquation(equation)) {
        postMessage(calculateParametricEquation({equation, ...rest}));
    }
});
