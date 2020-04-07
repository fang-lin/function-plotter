import {Coordinate, Size} from '../components/App.function';
import {Equation} from './Equation';
import {FunctionEquation} from './FunctionEquation';
import {ParametricEquation} from './ParametricEquation';

export interface CalculateOptions {
    size: Size;
    origin: Coordinate;
    scale: number;
    deviceRatio: number;
    isSmooth: boolean;
}

export type WorkerInput<T> = {
    equation: T;
    options: CalculateOptions;
}

class CalculateWorker {
    public worker: Worker;
    public isFree: boolean;
    private callback: (output: Coordinate[]) => void;

    constructor() {
        this.worker = new Worker('./calculate.worker.ts', {type: 'module'});
        this.isFree = true;
        this.worker.addEventListener('message', this.message);
    }

    exec<T extends Equation>(input: WorkerInput<T>, callback: (output: Coordinate[]) => void): void {
        if (this.isFree) {
            this.isFree = false;
            this.callback = callback;
            this.worker.postMessage(input);
        }
    }

    message = (event: MessageEvent): void => {
        this.isFree = true;
        this.callback(event.data);
    }
}

class WorkerPool<T extends Equation> {
    public pool: CalculateWorker[] = [];
    public queue: { input: WorkerInput<T>; resolve: (value: Coordinate[]) => void }[] = [];
    public workersMaxNum: number;

    constructor(workerMaxNum = 4) {
        this.workersMaxNum = workerMaxNum;
    }

    async exec(input: WorkerInput<T>): Promise<Coordinate[]> {
        return new Promise(resolve => {
            this.queue.push({input, resolve});
            this.run();
        });
    }

    run = (): void => {
        const task = this.queue[0];
        if (task) {
            const {input, resolve} = task;
            let worker = this.pool.filter(({isFree}) => isFree)[0];
            if (!worker && this.pool.length < this.workersMaxNum) {
                worker = new CalculateWorker();
                this.pool.push(worker);
            }
            if (worker) {
                this.queue.shift();
                worker.exec(input, (output: Coordinate[]) => {
                    this.run();
                    resolve(output);
                });
            }
        }
    }

}

export const workerPool = new WorkerPool<FunctionEquation | ParametricEquation>(navigator.hardwareConcurrency);
