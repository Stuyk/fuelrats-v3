import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { TimerController } from '../systems/timer';

TimerController.registerTimer('Update Player Positions', 500, handleUpdate);

function handleUpdate() {
    const players = [...alt.Player.all];

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.valid) {
            continue;
        }

        if (!player.getSyncedMeta(EventNames.META_READY)) {
            continue;
        }

        player.setSyncedMeta(EventNames.META_POS, player.pos);
    }
}
