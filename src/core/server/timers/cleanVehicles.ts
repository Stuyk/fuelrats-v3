import * as alt from 'alt-server';
import { MapController } from '../systems/map';
import { TimerController } from '../systems/timer';

TimerController.registerTimer('Clean Vehicles', 5000, handleUpdate);

function handleUpdate() {
    if (MapController.getPauseState()) {
        return;
    }

    const vehicles = [...alt.Vehicle.all];
    let destroyedCount = 0;

    for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];
        if (!vehicle.valid) {
            continue;
        }

        if (vehicle.driver) {
            continue;
        }

        destroyedCount += 1;
        vehicle.destroy();
    }

    if (destroyedCount <= 0) {
        return;
    }

    alt.log(`[Fuel Rats] Cleaned ${destroyedCount} Vehicles`);
}
