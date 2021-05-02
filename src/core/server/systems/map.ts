import alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { IMapData } from '../../shared/interface/MapData';
import { DEFAULT_CONFIG } from '../configuration/config';
import { distance } from '../utility/vector';
import { finishSelection, openSelection } from '../views/selection';
import { TimerController } from './timer';

const MaxRoundTimer = 60000 * 3;

let initialized = false;
let paused = false;
let currentMapIndex = 0;
let nextCanisterPickup = Date.now() + 1000;
let endTime = Date.now() + MaxRoundTimer;

export class MapController {
    static init() {
        initialized = true;
    }

    static getCurrentMap(): IMapData {
        if (!initialized) {
            MapController.init();
        }

        return DEFAULT_CONFIG.MAPS[currentMapIndex];
    }

    static getPauseState(): boolean {
        if (!initialized) {
            MapController.init();
        }

        return paused;
    }

    static getTimeLeft(): number {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            MapController.setupMap();
            alt.log('[Fuel Rats] Round Timer Exceeded');
        }

        return timeLeft;
    }

    static isScoreExceeded(): boolean {
        const maxScore = MapController.getCurrentMap().maxScore;
        const players = [...alt.Player.all];
        let exceeded = false;

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.valid) {
                continue;
            }

            if (!player.getSyncedMeta(EventNames.META_READY)) {
                continue;
            }

            const score = player.getSyncedMeta(EventNames.META_SCORE);
            if (score && score >= maxScore) {
                return true;
            }
        }

        return exceeded;
    }

    static setPauseState(value: boolean) {
        paused = value;
    }

    static nextMap() {
        currentMapIndex += 1;

        if (currentMapIndex >= DEFAULT_CONFIG.MAPS.length) {
            currentMapIndex = 0;
        }
    }

    /**
     * Used to setup the map after a player scores.
     * @static
     * @memberof MapController
     */
    static setupMap() {
        paused = true;
        let isNewMap = false;

        if (this.isScoreExceeded()) {
            this.nextMap();
            isNewMap = true;
        }

        const players = [...alt.Player.all];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];

            if (!player.valid) {
                continue;
            }

            player.setSyncedMeta(EventNames.META_SCORE, 0);

            if (!player.getSyncedMeta(EventNames.META_READY)) {
                continue;
            }

            if (player.vehicle && player.vehicle.valid) {
                player.vehicle.destroy();
                player.lastVehicle = null;
            }

            if (isNewMap) {
                openSelection(player);
            } else {
                player.isSelecting = true;
                finishSelection(player, player.lastVehicleModel);
            }
        }

        endTime = Date.now() + MaxRoundTimer;
        paused = false;
    }

    static reset() {}
}
