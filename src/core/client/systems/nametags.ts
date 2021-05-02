import alt from 'alt-client';
import * as native from 'natives';
import EventNames from '../../shared/enums/EventNames';

let drawDistance = 100;
let interval = alt.setInterval(drawNametags, 0);

/**
 * Toggled on through an interval.
 */
function drawNametags() {
    native.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false);

    if (!alt.Player.local || !alt.Player.local.getSyncedMeta(EventNames.META_READY)) {
        return;
    }

    for (let i = 0, n = alt.Player.all.length; i < n; i++) {
        let player = alt.Player.all[i];

        if (!player || !player.valid) {
            continue;
        }

        if (player.scriptID === alt.Player.local.scriptID) {
            continue;
        }

        let name = player.getSyncedMeta(EventNames.META_NAME);
        if (!name) {
            continue;
        }

        let dist = distance2d(player.pos, alt.Player.local.pos);
        if (dist > drawDistance) {
            continue;
        }

        let pos = { ...native.getPedBoneCoords(player.scriptID, 12844, 0, 0, 0) };
        pos.z += 0.75;

        if (player.vehicle) {
            pos = { ...player.vehicle.pos };
            pos.z += 0.75;
        }

        let scale = 1 - (0.8 * dist) / drawDistance;
        let fontSize = 0.6 * scale;

        const entity = player.vehicle ? player.vehicle.scriptID : player.scriptID;
        const vector = native.getEntityVelocity(entity);
        const frameTime = native.getFrameTime();
        const hasFuel = player.getSyncedMeta(EventNames.META_CANISTER);
        const newName = hasFuel ? `~r~[CANISTER]~n~${name}` : `${name}`;

        // Names
        native.setDrawOrigin(
            pos.x + vector.x * frameTime,
            pos.y + vector.y * frameTime,
            pos.z + vector.z * frameTime,
            0
        );
        native.beginTextCommandDisplayText('STRING');
        native.setTextFont(4);
        native.setTextScale(fontSize, fontSize);
        native.setTextProportional(true);
        native.setTextCentre(true);
        native.setTextColour(255, 255, 255, 255);
        native.setTextOutline();
        native.addTextComponentSubstringPlayerName(newName);
        native.endTextCommandDisplayText(0, 0, 0);
        native.clearDrawOrigin();
    }
}

/**
 * @param  {alt.Vector3} vector1
 * @param  {alt.Vector3} vector2
 */
function distance2d(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}
