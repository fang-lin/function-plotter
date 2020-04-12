import {Equation} from './Equation';
import {Coordinate, Size} from '../components/App/App.function';

export interface WorkerInput {
    type: string;
}

export interface EquationWorkerInput extends WorkerInput {
    type: 'Equation';
    equation: Equation;
    size: Size;
    origin: Coordinate;
    scale: number;
    deviceRatio: number;
    isSmooth: boolean;
}

export interface EquationWorkerOutput {
    map: Map<number, number>;
    coordinates: Coordinate[];
}

interface Task<T> {
    input: WorkerInput;
    resolve: (value?: T | PromiseLike<T>) => void;
}

class CalculateWorker {
    public worker: Worker;
    public isFree: boolean;
    private callback: (output: unknown) => void;

    constructor() {
        this.worker = new Worker('./worker.ts', {type: 'module'});
        this.isFree = true;
        this.worker.addEventListener('message', this.message);
    }

    exec<I extends WorkerInput>(input: I, callback: (output: EquationWorkerOutput) => void): void {
        if (this.isFree) {
            this.isFree = false;
            this.callback = callback;
            this.worker.postMessage(input);
        }
    }

    terminate(): void {
        this.worker.terminate();
    }

    message = (event: MessageEvent): void => {
        this.isFree = true;
        this.callback(event.data);
    }
}

class WorkerPool {
    public workers: CalculateWorker[] = [];
    public tasks: Task<EquationWorkerOutput>[] = [];
    public workersMaxNum: number;

    constructor(workerMaxNum = 4) {
        this.workersMaxNum = workerMaxNum;
    }

    async exec<I extends WorkerInput>(input: I): Promise<EquationWorkerOutput> {
        return new Promise<EquationWorkerOutput>(resolve => {
            this.tasks.push({input, resolve});
            this.run();
        });
    }

    terminate(): void {
        this.tasks = [];
        this.workers.map(worker => worker.terminate());
        this.workers = [];
    }

    run = (): void => {
        const task = this.tasks[0];
        if (task) {
            const {input, resolve} = task;
            let worker = this.workers.filter(({isFree}) => isFree)[0];
            if (!worker && this.workers.length < this.workersMaxNum) {
                worker = new CalculateWorker();
                this.workers.push(worker);
            }
            if (worker) {
                this.tasks.shift();
                worker.exec(input, (output) => {
                    this.run();
                    resolve(output);
                });
            }
        }
    }

}

export const workerPool = new WorkerPool(navigator.hardwareConcurrency);
