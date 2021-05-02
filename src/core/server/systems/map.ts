import alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { IMapData } from '../../shared/interface/MapData';
import { DEFAULT_CONFIG } from '../configuration/config';
import { distance } from '../utility/vector';
import { TimerController } from './timer';

const MaxRoundTimer = 60000 * 3;

let initialized = false;
let paused = false;
let currentMapIndex = 0;
let currentScoreCount = 0;
let currentMapInfo: IMapData = DEFAULT_CONFIG.MAPS[currentMapIndex];
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
        return Math.abs(Date.now() - endTime);
    }

    static setPauseState(value: boolean) {
        paused = value;
    }

    static nextMap() {
        currentMapIndex += 1;

        if (currentMapIndex >= DEFAULT_CONFIG.MAPS.length) {
            currentMapIndex = 0;
        }

        currentMapInfo = MapController.getCurrentMap();
    }

    static reposition() {
        const players = [...alt.Player.all];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.valid) {
                continue;
            }

            if (!player.getSyncedMeta(EventNames.META_READY)) {
                continue;
            }
        }
    }

    static reset() {}
}
