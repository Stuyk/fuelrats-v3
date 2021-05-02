import { CanisterController } from '../systems/canister';
import { TimerController } from '../systems/timer';

TimerController.registerTimer('Update Canister', 50, handleUpdate);

function handleUpdate() {
    CanisterController.update();
}
