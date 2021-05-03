import * as alt from 'alt-client';
import EventNames from '../../shared/enums/EventNames';
import { drawMarker } from '../utility/marker';
import { distance2d } from '../utility/vector';

alt.onServer(EventNames.TO_CLIENT_GOAL, handleGoal);

let blip: alt.PointBlip;
let interval: number;
let pos;

async function handleGoal(_pos: alt.IVector3) {
    pos = _pos;

    if (!interval) {
        interval = alt.setInterval(drawGoal, 0);
    }

    if (!blip) {
        blip = new alt.PointBlip(pos.x, pos.y, pos.z);
        blip.sprite = 38;
        blip.shortRange = false;
        blip.color = 2;
        blip.name = 'Goal';
        blip.priority = 99;
        blip.scale = 1;
    }

    if (!pos) {
        return;
    }

    blip.pos = new alt.Vector3(pos.x, pos.y, pos.z);
}

function drawGoal() {
    if (!alt.Player.local.getSyncedMeta(EventNames.META_READY)) {
        return;
    }

    if (!pos) {
        return;
    }

    const tmpPos = new alt.Vector3(pos.x, pos.y, pos.z - 1);
    const closeEnough = distance2d(alt.Player.local.pos, pos) <= 400;

    if (!closeEnough) {
        return;
    }

    drawMarker(
        1,
        tmpPos,
        new alt.Vector3(0, 0, 0),
        new alt.Vector3(0, 0, 0),
        new alt.Vector3(8, 8, 500),
        0,
        255,
        0,
        150
    );
}
