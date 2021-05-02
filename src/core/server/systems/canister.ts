import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { ICanister } from '../../shared/interface/Canister';
import { CanisterShape } from '../extensions/Colshape';
import { MapController } from './map';

let colshape: alt.Colshape;
let canister: ICanister;
let holder: alt.Player;
let nextPickupTime = Date.now() + 500;

export class CanisterController {
    static randomPosition(): alt.IVector3 {
        const map = MapController.getCurrentMap();
        const canisterIndex = Math.floor(Math.random() * map.canisters.length);
        return map.canisters[canisterIndex];
    }

    /**
     * Create the initial canister.
     * @static
     * @memberof CanisterController
     */
    static reset() {
        if (holder) {
            holder.setSyncedMeta(EventNames.META_CANISTER, false);
        }

        if (colshape) {
            colshape.destroy();
            colshape = null;
        }

        const pos = CanisterController.randomPosition();

        holder = null;
        canister = {
            pos,
            taken: false,
            owner: null,
        };
        colshape = new CanisterShape(pos.x, pos.y, pos.z, 1.5);
        colshape.playersOnly = false;

        alt.log(`[Fuel Rats] Canister has been reset.`);
        alt.emitClient(null, EventNames.TO_CLIENT_CANISTER, canister);
    }

    /**
     * Exchange the canister from one player to another.
     * @static
     * @param {alt.Player} from
     * @param {alt.Player} to
     * @memberof CanisterController
     */
    static exchange(from: alt.Player, to: alt.Player): boolean {
        if (Date.now() < nextPickupTime) {
            return false;
        }

        nextPickupTime = Date.now() + 500;
        holder = to;
        canister.owner = to.id;
        from.setSyncedMeta(EventNames.META_CANISTER, false);
        to.setSyncedMeta(EventNames.META_CANISTER, true);

        if (from.vehicle) {
            from.vehicle.customPrimaryColor = new alt.RGBA(255, 255, 255, 255);
            from.vehicle.customSecondaryColor = new alt.RGBA(255, 255, 255, 255);
        }

        if (to.vehicle) {
            to.vehicle.customPrimaryColor = new alt.RGBA(255, 0, 0, 255);
            to.vehicle.customSecondaryColor = new alt.RGBA(255, 0, 0, 255);
        }

        return true;
    }

    /**
     * Pickup the canister.
     * @static
     * @param {alt.Player} player
     * @memberof CanisterController
     */
    static pickup(player: alt.Player): boolean {
        if (Date.now() < nextPickupTime) {
            return false;
        }

        nextPickupTime = Date.now() + 500;

        if (colshape) {
            colshape.destroy();
            colshape = null;
        }

        holder = player;
        canister.owner = player.id;
        canister.taken = true;
        canister.pos = player.pos;
        player.setSyncedMeta(EventNames.META_CANISTER, true);

        if (player.vehicle) {
            player.vehicle.customPrimaryColor = new alt.RGBA(255, 0, 0, 255);
            player.vehicle.customSecondaryColor = new alt.RGBA(255, 0, 0, 255);
        }

        return true;
    }

    /**
     * Force the canister to update.
     * @static
     * @memberof CanisterController
     */
    static update() {
        // Likely Holder Disconnected Here
        if (canister.taken && (!holder || !holder.valid)) {
            holder = null;
            canister.owner = null;
            canister.taken = false;
            colshape = new CanisterShape(canister.pos.x, canister.pos.y, canister.pos.z, 1.5);
            colshape.playersOnly = false;
            alt.log(`[Fuel Rats] Player disconnected with Canister. Dropped canister.`);
        }

        // Likely has canister
        if (holder && holder.valid) {
            canister.pos = holder.pos;
            holder.setSyncedMeta(EventNames.META_CANISTER, true);
        }

        alt.emitClient(null, EventNames.TO_CLIENT_CANISTER, canister);
    }

    /**
     * Called when a player enters the ColShape in their vehicle.
     * @static
     * @param {CanisterShape} colshape
     * @param {alt.Entity} entity
     * @return {*}
     * @memberof CanisterController
     */
    static enter(colshape: CanisterShape, entity: alt.Entity) {
        if (!colshape.isCanister) {
            return;
        }

        if (!(entity instanceof alt.Vehicle)) {
            return;
        }

        if (!entity.driver) {
            return;
        }

        CanisterController.pickup(entity.driver);
    }
}

alt.on('entityEnterColshape', CanisterController.enter);
