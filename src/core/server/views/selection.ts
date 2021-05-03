import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { DEFAULT_CONFIG } from '../configuration/config';
import { MapController } from '../systems/map';

/**
 * Opens the vehicle selector for a player.
 * Also resets some meta.
 * @export
 * @param {alt.Player} player
 */
export function openSelection(player: alt.Player) {
    alt.log('OPEN SELECTION');

    if (player.lastVehicle) {
        try {
            player.lastVehicle.destroy();
        } catch (err) {
            throw err;
        }

        player.lastVehicle = null;
    }

    player.isSelecting = true;
    player.visible = false;
    player.setSyncedMeta(EventNames.META_READY, false);
    player.setSyncedMeta(EventNames.META_CANISTER, false);
    alt.emitClient(
        player,
        EventNames.TO_CLIENT_OPEN_VEHICLE_SELECT,
        DEFAULT_CONFIG.VEHICLE_SELECT_SPAWN,
        MapController.getCurrentMap().vehicles
    );
}

/**
 * Force finish selection.
 * @export
 * @param {alt.Player} player
 * @param {string} model
 * @return {*}
 */
export function finishSelection(player: alt.Player, model: string) {
    if (!player.isSelecting) {
        player.kick('Invalid State');
        return;
    }

    const map = MapController.getCurrentMap();
    player.isSelecting = false;
    player.setSyncedMeta(EventNames.META_READY, true);
    player.spawn(map.spawn.x, map.spawn.y, map.spawn.z, 0);
    player.lastVehicleModel = model;
    player.lastVehicle = new alt.Vehicle(model, map.spawn.x, map.spawn.y, map.spawn.z, 0, 0, 0);
    player.lastVehicle.customPrimaryColor = new alt.RGBA(255, 255, 255, 255);
    player.lastVehicle.customSecondaryColor = new alt.RGBA(255, 255, 255, 255);
    player.lastVehicle.engineOn = true;
    player.setDateTime(1, 1, 2021, map.atmosphere.hour, map.atmosphere.minute, 0);
    player.setWeather(map.atmosphere.weather);

    alt.emitClient(player, EventNames.TO_CLIENT_SET_INTO_VEHICLE, player.lastVehicle);
}

alt.onClient(EventNames.TO_SERVER_SELECT_VEHICLE, finishSelection);
