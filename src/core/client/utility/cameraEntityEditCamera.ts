import * as alt from 'alt-client';
import * as native from 'natives';

let cameraControlsInterval;
let camera;
let zpos = 0.5;
let fov = 90;
let startPosition: alt.IVector3;
let startCamPosition: alt.IVector3;
let startForwardVector: alt.IVector3;
let entity;
let useForwardVectorZoom = false;
let forwardOffset = 0;

export function createEntityEditCamera(targetEntity, fwdOffset = 1.2, overrideZoom = false) {
    entity = targetEntity;
    startPosition = { ...native.getEntityCoords(entity, false) };
    useForwardVectorZoom = overrideZoom;

    if (!camera) {
        const forwardVector = native.getEntityForwardVector(targetEntity);
        startForwardVector = forwardVector;
        forwardOffset = fwdOffset;

        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * fwdOffset,
            y: startPosition.y + forwardVector.y * fwdOffset,
            z: startPosition.z + zpos,
        };

        fov = 90;
        startCamPosition = forwardCameraPosition;

        camera = native.createCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            forwardCameraPosition.x,
            forwardCameraPosition.y,
            forwardCameraPosition.z + zpos,
            0,
            0,
            0,
            fov,
            true,
            0
        );

        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, false);
    }

    if (!cameraControlsInterval) {
        cameraControlsInterval = alt.setInterval(handleControls, 0);
    }
}

export function destroyEntityEditCamera() {
    if (cameraControlsInterval) {
        alt.clearInterval(cameraControlsInterval);
        cameraControlsInterval = null;
    }

    if (camera) {
        camera = null;
    }

    entity = null;
    native.destroyAllCams(true);
    native.renderScriptCams(false, false, 0, false, false, false);
}

function handleControls() {
    native.disableControlAction(0, 24, true);
    native.disableControlAction(0, 25, true);
    native.disableControlAction(0, 32, true); // w
    native.disableControlAction(0, 33, true); // s
    native.disableControlAction(0, 34, true); // a
    native.disableControlAction(0, 35, true); // d
    native.hideHudAndRadarThisFrame();
    native.hudWeaponWheelIgnoreControlInput(true);
    native.blockWeaponWheelThisFrame();

    const [_, width] = native.getActiveScreenResolution(0, 0);
    const cursor = alt.getCursorPos();
    const _x = cursor.x;
    let oldHeading = native.getEntityHeading(entity);
    let isInCenterOfScreen = _x < width / 2 + 250 && _x > width / 2 - 250;

    if (!useForwardVectorZoom) {
        // SCroll Up
        if (native.isDisabledControlPressed(0, 15) && isInCenterOfScreen) {
            fov -= 2;

            if (fov < 20) {
                fov = 20;
            }

            native.setCamFov(camera, fov);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, false);
        }

        // SCroll Down
        if (native.isDisabledControlPressed(0, 16) && isInCenterOfScreen) {
            fov += 2;

            if (fov > 100) {
                fov = 100;
            }

            native.setCamFov(camera, fov);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, false);
        }
    } else {
        // SCroll Up
        if (native.isDisabledControlPressed(0, 15) && isInCenterOfScreen) {
            forwardOffset -= 0.05;

            if (forwardOffset < 0.1) {
                forwardOffset = 0.1;
            }

            const forwardCameraPosition = {
                x: startPosition.x + startForwardVector.x * forwardOffset,
                y: startPosition.y + startForwardVector.y * forwardOffset,
                z: startPosition.z + zpos,
            };

            native.setCamCoord(camera, forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, false);
        }

        if (native.isDisabledControlPressed(0, 16) && isInCenterOfScreen) {
            forwardOffset += 0.05;

            if (forwardOffset > 10) {
                forwardOffset = 10;
            }

            const forwardCameraPosition = {
                x: startPosition.x + startForwardVector.x * forwardOffset,
                y: startPosition.y + startForwardVector.y * forwardOffset,
                z: startPosition.z + zpos,
            };

            native.setCamCoord(camera, forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z);
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, false);
        }
    }

    if (native.isDisabledControlPressed(0, 32)) {
        zpos += 0.01;

        if (zpos > 1.2) {
            zpos = 1.2;
        }

        if (useForwardVectorZoom) {
            const forwardCameraPosition = {
                x: startPosition.x + startForwardVector.x * forwardOffset,
                y: startPosition.y + startForwardVector.y * forwardOffset,
                z: startPosition.z + zpos,
            };

            native.setCamCoord(camera, forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z);
        } else {
            native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
        }

        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, false);
    }

    if (native.isDisabledControlPressed(0, 33)) {
        zpos -= 0.01;

        if (zpos < -1.2) {
            zpos = -1.2;
        }

        if (useForwardVectorZoom) {
            const forwardCameraPosition = {
                x: startPosition.x + startForwardVector.x * forwardOffset,
                y: startPosition.y + startForwardVector.y * forwardOffset,
                z: startPosition.z + zpos,
            };

            native.setCamCoord(camera, forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z);
        } else {
            native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
        }

        native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, false);
    }

    // rmb
    if (native.isDisabledControlPressed(0, 25)) {
        // Rotate Negative
        if (_x < width / 2) {
            const newHeading = (oldHeading -= 1);
            native.setEntityHeading(entity, newHeading);
        }

        // Rotate Positive
        if (_x > width / 2) {
            const newHeading = (oldHeading += 1);
            native.setEntityHeading(entity, newHeading);
        }
    }

    // d
    if (native.isDisabledControlPressed(0, 35)) {
        const newHeading = (oldHeading += 1);
        native.setEntityHeading(entity, newHeading);
    }

    // a
    if (native.isDisabledControlPressed(0, 34)) {
        const newHeading = (oldHeading -= 1);
        native.setEntityHeading(entity, newHeading);
    }
}
