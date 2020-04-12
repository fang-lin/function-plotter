import {calculateFunctionEquation} from './calculateFunctionEquation';
import {isFunctionEquation} from './FunctionEquation';

addEventListener('message', (event: MessageEvent) => {
    const data = event.data;
    const {equation, ...rest} = data;
    if (isFunctionEquation(equation)) {
        postMessage(calculateFunctionEquation({equation, ...rest}));
    }
});
