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

export interface TrackPointWorkerInput extends WorkerInput {
    type: 'TrackPoint';
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

    exec<I extends WorkerInput, T extends Coordinate | Coordinate[]>(input: I, callback: (output: T) => void): void {
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

class WorkerPool {
    public pool: CalculateWorker[] = [];
    public queue: Task<Coordinate | Coordinate[]>[] = [];
    public workersMaxNum: number;

    constructor(workerMaxNum = 4) {
        this.workersMaxNum = workerMaxNum;
    }

    async exec<I extends WorkerInput, T extends Coordinate | Coordinate[]>(input: I): Promise<T> {
        return new Promise<T>(resolve => {
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
                worker.exec(input, (output) => {
                    this.run();
                    resolve(output);
                });
            }
        }
    }

}

export const workerPool = new WorkerPool(navigator.hardwareConcurrency);
