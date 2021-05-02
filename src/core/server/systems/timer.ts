import * as alt from 'alt-server';
import { ITimed } from '../interface/Timed';
import { MapController } from './map';

const Timers: Array<ITimed> = [];
let timeout;

export class TimerController {
    /**
     * Run all timers to check for changes.
     * @static
     * @return {*}
     * @memberof TimerController
     */
    static handleTick() {
        if (MapController.getPauseState()) {
            return;
        }

        for (let i = 0; i < Timers.length; i++) {
            const timer = Timers[i];

            if (!timer.nextUpdate || Date.now() > timer.nextUpdate) {
                timer.nextUpdate = Date.now() + timer.timeBetweenUpdates;
                timer.callback();
            }
        }
    }

    /**
     * Register a timed callback that runs non-stop.
     * @static
     * @param {string} name
     * @param {number} timeBetweenUpdates
     * @param {Function} callback
     * @memberof TimerController
     */
    static registerTimer(name: string, timeBetweenUpdates: number, callback: Function) {
        if (timeout) {
            alt.clearTimeout(timeout);
            timeout = null;
        }

        Timers.push({ name, callback, timeBetweenUpdates });
        timeout = alt.setTimeout(TimerController.listTimers, 1500);
    }

    /**
     * Used to list all the current timers registered.
     * @static
     * @memberof TimerController
     */
    static listTimers() {
        for (let i = 0; i < Timers.length; i++) {
            const timer = Timers[i];
            alt.log(`[Fuel Rats] Registered Timer - ${timer.name}`);
        }
    }
}

alt.setInterval(TimerController.handleTick, 100);
