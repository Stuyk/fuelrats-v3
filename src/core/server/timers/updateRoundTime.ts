import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { MapController } from '../systems/map';
import { TimerController } from '../systems/timer';

TimerController.registerTimer('Update Round Time', 1000, handleUpdate);

function handleUpdate() {
    alt.emitClient(null, EventNames.TO_CLIENT_UPDATE_TIMER, MapController.getTimeLeft());
}
