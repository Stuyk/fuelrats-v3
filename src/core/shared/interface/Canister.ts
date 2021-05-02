import { Vector3 } from './Vector3';

export interface ICanister {
    owner: number;
    pos: Vector3;
    taken: boolean;
}
