import * as alt from 'alt-client';
import * as native from 'natives';

export function drawMarker(
    type: number,
    pos: alt.IVector3,
    dir: alt.IVector3,
    rot: alt.IVector3,
    scale: alt.IVector3,
    r: number,
    g: number,
    b: number,
    alpha: number
) {
    native.drawMarker(
        type,
        pos.x,
        pos.y,
        pos.z,
        dir.x,
        dir.y,
        dir.z,
        rot.x,
        rot.y,
        rot.z,
        scale.x,
        scale.y,
        scale.z,
        r,
        g,
        b,
        alpha,
        false,
        true,
        2,
        false,
        undefined,
        undefined,
        false
    );
}
