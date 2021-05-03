import * as alt from 'alt-client';
import * as native from 'natives';
import EventNames from '../../shared/enums/EventNames';
import { ICanister } from '../../shared/interface/Canister';
import { drawMarker } from '../utility/marker';
import { loadModel } from '../utility/model';
import { distance2d } from '../utility/vector';

alt.onServer(EventNames.TO_CLIENT_CANISTER, handleCanister);

const SPRITE_CANISTER = 361;
const SPRITE_HIGHER = 11;
const SPRITE_LOWER = 12;
const CANISTER_MODEL = 'prop_jerrycan_01a';
const CANISTER_HASH = alt.hash(CANISTER_MODEL);

let modelLoaded = false;
let blip: alt.PointBlip;
let interval: number;
let object: number;
let canister: ICanister;

if (!modelLoaded) {
    loadModel(CANISTER_MODEL).then((res) => {
        modelLoaded = res;
    });
}

function getSprite(): number {
    let sprite = SPRITE_CANISTER;

    if (!canister || !canister.pos) {
        return SPRITE_CANISTER;
    }

    if (alt.Player.local.pos.z - 2 > canister.pos.z) {
        sprite = SPRITE_LOWER;
    }

    if (alt.Player.local.pos.z + 2 < canister.pos.z) {
        sprite = SPRITE_HIGHER;
    }

    return sprite;
}

async function handleCanister(_canister: ICanister) {
    canister = _canister;

    if (!interval) {
        interval = alt.setInterval(drawCanisterMarker, 0);
    }

    if (!blip) {
        blip = new alt.PointBlip(canister.pos.x, canister.pos.y, canister.pos.z);
        blip.shortRange = false;
    }

    blip.pos = { ...canister.pos } as alt.Vector3;
    blip.sprite = getSprite();
    blip.color = 1;
    blip.name = 'Canister';
    blip.priority = 99;
    blip.scale = 1;
}

function moveCanister(vehicle: alt.Vehicle, skipEntityCheck: boolean = false) {
    if (!skipEntityCheck) {
        if (!vehicle) {
            if (object) {
                native.deleteEntity(object);
                object = null;
            }
            return;
        }
    }

    if (!object) {
        object = native.createObjectNoOffset(
            CANISTER_HASH,
            canister.pos.x,
            canister.pos.y,
            canister.pos.z,
            false,
            false,
            false
        );
        native.freezeEntityPosition(object, true);
        native.setEntityCollision(object, false, false);
    }

    if (vehicle) {
        native.attachEntityToEntity(
            object,
            vehicle.scriptID,
            0,
            0,
            0,
            1.5,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            false
        );
    } else {
        native.detachEntity(object, false, false);
        native.setEntityCoordsNoOffset(object, canister.pos.x, canister.pos.y, canister.pos.z, false, false, false);
        native.setEntityCollision(object, false, false);
    }
}

function updateCanisterPosition(player: alt.Player, closeEnough: boolean) {
    if (player && player.vehicle && closeEnough) {
        moveCanister(player.vehicle);
        return;
    }

    if (closeEnough) {
        moveCanister(null, true);
        return;
    }

    moveCanister(null);
}

function drawCanisterMarker() {
    if (!alt.Player.local.getSyncedMeta(EventNames.META_READY)) {
        return;
    }

    if (!canister) {
        return;
    }

    const player = alt.Player.all.find((p) => p.id === canister.owner);
    const closeEnough = distance2d(alt.Player.local.pos, canister.pos) <= 100;
    updateCanisterPosition(player, closeEnough);

    if (canister.owner === alt.Player.local.id) {
        return;
    }

    let pos;

    if (closeEnough && player && player.vehicle) {
        pos = { ...player.vehicle.pos };
    } else {
        pos = { ...canister.pos };
    }

    pos = new alt.Vector3(pos.x, pos.y, pos.z + 3);
    drawMarker(
        1,
        pos,
        new alt.Vector3(0, 0, 0),
        new alt.Vector3(0, 0, 0),
        new alt.Vector3(0.2, 0.2, 500),
        255,
        0,
        0,
        200
    );
}

export function getCanisterInfo(): ICanister | null {
    return canister;
}
