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

    drawText2d(`${(milliseconds / 1000).toFixed(0)}s`, { x: 0.5, y: 0.05 }, 0.6, 255, 255, 255, 255);
}
