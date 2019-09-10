import {observable, action} from 'mobx';
import {Coordinate} from '../components/App';

export class Preferences {
    @observable isSmooth: boolean = true;
    @observable showCoordinate: boolean = false;
    @observable cursor: Coordinate = [NaN, NaN];

    @action
    switchSmooth = () => {
        this.isSmooth = !this.isSmooth;
        // window.requestAnimationFrame(equations.redraw);
    };

    @action
    switchCoordinate = () => {
        this.showCoordinate = !this.showCoordinate;
    };

    @action
    updateCursor = (cursor: Coordinate) => {
        this.cursor = cursor;
    };
}
