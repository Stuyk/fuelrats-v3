import * as alt from 'alt-server';

export class CanisterShape extends alt.ColshapeCylinder {
    isCanister: boolean;

    constructor(x: number, y: number, z: number, radius: number) {
        super(x, y, z - 1, radius, 4);
        this.isCanister = true;
    }
}

export class GoalShape extends alt.ColshapeCylinder {
    isGoal: boolean;

    constructor(x: number, y: number, z: number, radius: number) {
        super(x, y, z - 1, radius, 4);
        this.isGoal = true;
    }
}
