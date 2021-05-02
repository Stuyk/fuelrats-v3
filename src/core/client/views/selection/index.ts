import * as alt from 'alt-client';
import * as native from 'natives';
import EventNames from '../../../shared/enums/EventNames';
import { View } from '../../extensions/view';
import { createEntityEditCamera, destroyEntityEditCamera } from '../../utility/cameraEntityEditCamera';
import { loadModel } from '../../utility/model';

// const url = `http://127.0.0.1:5555/src/core/client/views/selection/html/index.html`;
const url = `http://resource/client/views/selection/html/index.html`;
let view: View;
let vehicle: number;
let startPosition: alt.IVector3 = { x: 0, y: 0, z: 0 };

async function handleOpenSelection(_startPosition: alt.IVector3) {
    startPosition = _startPosition;

    view = await View.getInstance(url, true, false);
    view.on('selector:Ready', handleReady);
    view.on('selector:SetSelection', handleSetSelection);
    view.on('selector:Select', handleSelection);

    alt.toggleGameControls(false);
}

function handleReady() {
    // Something about loading valid vehicles...
}

function destroyVehicle() {
    if (vehicle) {
        native.deleteEntity(vehicle);
    }

    vehicle = null;
}

async function handleSetSelection(model: string) {
    await destroyVehicle();
    await loadModel(model);

    const hash = native.getHashKey(model);
    vehicle = native.createVehicle(hash, startPosition.x, startPosition.y, startPosition.z, 0, false, false, false);
    native.setVehicleCustomPrimaryColour(vehicle, 255, 255, 255);
    native.setVehicleCustomSecondaryColour(vehicle, 255, 255, 255);
    native.freezeEntityPosition(vehicle, true);

    createEntityEditCamera(vehicle, 4, true);
    native.setEntityHeading(vehicle, 46);
    native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle, -1);
    native.setPedConfigFlag(alt.Player.local.scriptID, 32, false);
    native.setPedConfigFlag(alt.Player.local.scriptID, 429, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 184, true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 35, false);
    native.setPedComponentVariation(alt.Player.local.scriptID, 4, 34, 0, 2);
    native.setPedComponentVariation(alt.Player.local.scriptID, 6, 25, 0, 2);
    native.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 2);
    native.setPedComponentVariation(alt.Player.local.scriptID, 11, 243, 0, 2);
    native.setPedComponentVariation(alt.Player.local.scriptID, 15, 96, 0, 2);
    native.setPedPropIndex(alt.Player.local.scriptID, 0, 18, 0, true);
}

function handleSelection(model: string) {
    alt.emitServer(EventNames.TO_SERVER_SELECT_VEHICLE, model);
    destroyEntityEditCamera();
    destroyVehicle();

    if (view) {
        view.close();
    }

    alt.toggleGameControls(true);
}

alt.onServer(EventNames.TO_CLIENT_OPEN_VEHICLE_SELECT, handleOpenSelection);
