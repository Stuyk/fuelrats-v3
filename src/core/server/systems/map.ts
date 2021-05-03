import alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { IMapData } from '../../shared/interface/MapData';
import { DEFAULT_CONFIG } from '../configuration/config';
import { distance } from '../utility/vector';
import { finishSelection, openSelection } from '../views/selection';
import { CanisterController } from './canister';
import { GoalController } from './goal';
import { TimerController } from './timer';

const MaxRoundTimer = 60000 * 3;

let initialized = false;
let paused = false;
let currentMapIndex = 0;
let endTime = Date.now() + MaxRoundTimer;
let spawnProtectionTimeout;

export class MapController {
    static init() {
        initialized = true;
        CanisterController.reset();
        GoalController.reset();
    }

    /**
     * Get current map information.
     * @static
     * @return {*}  {IMapData}
     * @memberof MapController
     */
    static getCurrentMap(): IMapData {
        if (!initialized) {
            MapController.init();
        }

        return DEFAULT_CONFIG.MAPS[currentMapIndex];
    }

    /**
     * Get the current pause state of the map.
     * @static
     * @return {*}  {boolean}
     * @memberof MapController
     */
    static getPauseState(): boolean {
        if (!initialized) {
            MapController.init();
        }

        return paused;
    }

    /**
     * Get time left in this map's round in milliseconds
     * @static
     * @return {*}  {number}
     * @memberof MapController
     */
    static getTimeLeft(): number {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            MapController.setupMap();
            alt.log('[Fuel Rats] Round Timer Exceeded');
        }

        return timeLeft;
    }

    /**
     * Check if the max score has been exceeded for the map.
     * @static
     * @return {*}  {boolean}
     * @memberof MapController
     */
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

    /**
     * Set the current pause state for the map.
     * Used to update the gamemode without breaking stuff.
     * @static
     * @param {boolean} value
     * @memberof MapController
     */
    static setPauseState(value: boolean) {
        paused = value;
    }

    /**
     * Increments the map list.
     * @static
     * @memberof MapController
     */
    static nextMap() {
        currentMapIndex += 1;

        if (currentMapIndex >= DEFAULT_CONFIG.MAPS.length) {
            currentMapIndex = 0;
        }
    }

    /**
     * Used to apply meta to everyone.
     * @static
     * @param {string} metaName
     * @param {*} value
     * @memberof MapController
     */
    static applyMetaToAll(metaName: string, value: any) {
        const players = [...alt.Player.all];
        for (let i = 0; i < players.length; i++) {
            const player = players[i];

            if (!player.valid) {
                continue;
            }

            player.setSyncedMeta(metaName, value);
        }
    }

    /**
     * Used to setup the map after a player scores.
     * @static
     * @memberof MapController
     */
    static setupMap() {
        MapController.setPauseState(true);
        let isNewMap = false;

        if (this.isScoreExceeded()) {
            this.nextMap();
            isNewMap = true;
        }

        const map = MapController.getCurrentMap();
        const players = [...alt.Player.all];
        for (let i = 0; i < players.length; i++) {
            const player = players[i];

            if (!player.valid) {
                continue;
            }

            player.setSyncedMeta(EventNames.META_CANISTER, false);
            player.setSyncedMeta(EventNames.META_SCORE, 0);
            player.setSyncedMeta(EventNames.META_SPAWN_PROTECTION, true);
            player.setDateTime(1, 1, 2021, map.atmosphere.hour, map.atmosphere.minute, 0);
            player.setWeather(map.atmosphere.weather);

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

        if (spawnProtectionTimeout) {
            alt.clearTimeout(spawnProtectionTimeout);
            spawnProtectionTimeout = null;
        }

        spawnProtectionTimeout = alt.setTimeout(() => {
            MapController.applyMetaToAll(EventNames.META_SPAWN_PROTECTION, false);
        }, DEFAULT_CONFIG.SPAWN_PROTECTION);

        endTime = Date.now() + MaxRoundTimer;
        GoalController.reset();
        CanisterController.reset();
        MapController.setPauseState(false);
    }

    /**
     * Tells the map that a score just happened.
     * @static
     * @param {alt.Player} player
     * @memberof MapController
     */
    static score(player: alt.Player) {
        let currentScore = player.getSyncedMeta(EventNames.META_SCORE);

        if (!currentScore) {
            currentScore = 1;
        } else {
            currentScore += 1;
        }

        player.setSyncedMeta(EventNames.META_SCORE, currentScore);
        MapController.setupMap();
    }
}
