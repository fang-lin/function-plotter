import {EquationWorkerInput, TrackPointWorkerInput, WorkerInput} from './workerPool';
import {calculateFunctionEquation} from './calculateFunctionEquation';
import {isFunctionEquation} from './FunctionEquation';
import {calculateTrackPoint} from './calculateTrackPoint';

function isEquationWorkerInput(input: WorkerInput): input is EquationWorkerInput {
    return input.type === 'Equation';
}

function isTrackPointWorkerInput(input: WorkerInput): input is TrackPointWorkerInput {
    return input.type === 'TrackPoint';
}

addEventListener('message', (event: MessageEvent) => {
    const data = event.data;
    if (isEquationWorkerInput(data)) {
        const {equation, ...rest} = data;
        if (isFunctionEquation(equation)) {
            postMessage(calculateFunctionEquation({equation, ...rest}));
        }
    } else if (isTrackPointWorkerInput(data)) {
        postMessage(calculateTrackPoint(data));
    }

    // const cursor = canvasToEquation(point, origin, size, scale);
    // const ss = coordinates.filter(point => ((point[0] - cursor[0]) ** 2 + (point[1] - cursor[1]) ** 2) ** .5 < 20 * deviceRatio / scale);

    // const {equation, options} = event.data as WorkerInput<FunctionEquation | ParametricEquation>;
    // if (isFunctionEquation(equation)) {
    //     postMessage(calculateFunctionEquation(equation, options));
    // }
});
