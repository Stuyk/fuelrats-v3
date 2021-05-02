import * as alt from 'alt-server';
import { IDiscord } from '../interface/Discord';

declare module 'alt-server' {
    export interface Player {
        discord: IDiscord;
        displayName: string;
        joinTime: number;
        isSelecting: boolean;

        lastVehicle: alt.Vehicle;
        lastVehicleModel: string;
    }
}
