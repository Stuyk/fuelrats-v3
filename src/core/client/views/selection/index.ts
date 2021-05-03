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
let vehicles: Array<string> = [];
let startPosition: alt.IVector3 = { x: 0, y: 0, z: 0 };

async function handleOpenSelection(_startPosition: alt.IVector3, _vehicles: Array<string>) {
    startPosition = _startPosition;
    vehicles = _vehicles;

    view = await View.getInstance(url, true, false);
    view.on('selector:Ready', handleLoad);
    view.on('selector:SetSelection', handleSetSelection);
    view.on('selector:Select', handleSelection);
    view.isVisible = false;
    native.doScreenFadeOut(0);
    alt.toggleGameControls(false);
}

async function handleLoad() {
    const promises = vehicles.map((vehicle) => loadModel(vehicle));
    await Promise.all(promises);

    view.isVisible = true;
    view.emit('selector:SetVehicles', vehicles);
}

async function handleSetSelection(model: string) {
    native.doScreenFadeIn(0);

    if (vehicle) {
        native.deleteEntity(vehicle);
    }

    alt.log(`CREATED VEHICLE: ${model}`);

    destroyEntityEditCamera();

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

    alt.nextTick(() => {
        native.setVehicleEngineOn(vehicle, true, false, false);
        native.startAudioScene('DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE');
        native.setVehRadioStation(vehicle, 'OFF');
        native.setRadioToStationName('OFF');
    });
}

async function handleSelection(model: string) {
    if (vehicle) {
        native.deleteEntity(vehicle);
    }

    await destroyEntityEditCamera();

    view.close();
    alt.toggleGameControls(true);
    alt.emitServer(EventNames.TO_SERVER_SELECT_VEHICLE, model);
}

alt.onServer(EventNames.TO_CLIENT_OPEN_VEHICLE_SELECT, handleOpenSelection);
