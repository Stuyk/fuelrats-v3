import * as alt from 'alt-client';
import EventNames from '../../shared/enums/EventNames';
import { drawText2d } from '../utility/text';

let interval;
let milliseconds: number;

alt.onServer(EventNames.TO_CLIENT_UPDATE_TIMER, handleUpdate);

function handleUpdate(_milliseconds) {
    if (!interval) {
        interval = alt.setInterval(handleTick, 0);
    }

    milliseconds = _milliseconds;
}

function handleTick() {
    if (!alt.Player.local.getSyncedMeta(EventNames.META_READY)) {
        return;
    }

    if (!milliseconds) {
        return;
    }

    drawText2d(`~p~Time Left~n~~w~${convert(milliseconds)}`, { x: 0.5, y: 0.025 }, 0.6, 255, 255, 255, 255);
}

function convert(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return `${minute.toFixed(0)}m ${seconds.toFixed(0)}s`;
}
