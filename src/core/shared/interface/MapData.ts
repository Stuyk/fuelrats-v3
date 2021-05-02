import { IAtmosphere } from './Atmosphere';
import { Vector3 } from './Vector3';

export interface IMapData {
    vehicles: Array<string>;
    maxScore: number;
    atmosphere: IAtmosphere;
    spawn: Vector3;
    canisters: Array<Vector3>;
    goals: Array<Vector3>;
}
