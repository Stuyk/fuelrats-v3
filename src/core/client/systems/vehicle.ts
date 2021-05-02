import * as alt from 'alt-client';
import * as native from 'natives';
import EventNames from '../../shared/enums/EventNames';

alt.onServer(EventNames.TO_CLIENT_SET_INTO_VEHICLE, handleSetIntoVehicle);

function handleSetIntoVehicle(vehicle: alt.Vehicle) {
    if (!vehicle) {
        return;
    }

    const interval = alt.setInterval(() => {
        if (!vehicle.valid) {
            return;
        }

        if (!alt.Player.local.vehicle) {
            native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
        } else {
            native.setPedConfigFlag(alt.Player.local.scriptID, 32, false);
            native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
            native.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
            native.setPedConfigFlag(alt.Player.local.scriptID, 35, false);
            native.pauseClock(true);

            native.setPedComponentVariation(alt.Player.local.scriptID, 4, 34, 0, 2);
            native.setPedComponentVariation(alt.Player.local.scriptID, 6, 25, 0, 2);
            native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 2);
            native.setPedComponentVariation(alt.Player.local.scriptID, 11, 243, 0, 2);
            native.setPedComponentVariation(alt.Player.local.scriptID, 15, 96, 0, 2);
            native.setPedPropIndex(alt.Player.local.scriptID, 0, 18, 0, true);
            native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, true, false, false);

            alt.clearInterval(interval);
        }
    }, 100);
}
