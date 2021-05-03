import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { GoalShape } from '../extensions/Colshape';
import { CanisterController } from './canister';
import { MapController } from './map';

let colshape: GoalShape;
let pos;

export class GoalController {
    static randomPosition(): alt.IVector3 {
        const map = MapController.getCurrentMap();
        const canisterIndex = Math.floor(Math.random() * map.goals.length);
        return map.goals[canisterIndex];
    }

    static reset() {
        if (colshape) {
            colshape.destroy();
            colshape = null;
        }

        pos = GoalController.randomPosition();
        colshape = new GoalShape(pos.x, pos.y, pos.z, 4);
        alt.emitClient(null, EventNames.TO_CLIENT_GOAL, pos);
        alt.log(`[Fuel Rats] Goal has been reset.`);
    }

    /**
     * Called when a player enters the ColShape in their vehicle.
     * @static
     * @param {CanisterShape} colshape
     * @param {alt.Entity} entity
     * @return {*}
     * @memberof CanisterController
     */
    static deliver(player: alt.Player) {
        if (!player || !player.valid) {
            return;
        }

        if (!CanisterController.isOwner(player)) {
            return;
        }

        MapController.score(player);
    }

    static update() {
        if (MapController.getPauseState()) {
            return;
        }

        if (!pos) {
            return;
        }

        alt.emitClient(null, EventNames.TO_CLIENT_GOAL, pos);
    }

    /**
     * Called when a player enters the ColShape in their vehicle.
     * @static
     * @param {CanisterShape} colshape
     * @param {alt.Entity} entity
     * @return {*}
     * @memberof CanisterController
     */
    static enter(colshape: GoalShape, entity: alt.Entity) {
        if (MapController.getPauseState()) {
            return;
        }

        if (!colshape.isGoal) {
            return;
        }

        if (!(entity instanceof alt.Vehicle)) {
            return;
        }

        if (!entity.driver) {
            return;
        }

        GoalController.deliver(entity.driver);
    }
}

alt.on('entityEnterColshape', GoalController.enter);
