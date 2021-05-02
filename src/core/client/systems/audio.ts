import * as alt from 'alt-client';
import * as native from 'natives';

alt.onServer('audio:PlayFrontend', playFrontendSound);

export function playFrontendSound(name, dict) {
    native.playSoundFrontend(-1, name, dict, false);
}
