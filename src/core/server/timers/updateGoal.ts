import { GoalController } from '../systems/goal';
import { TimerController } from '../systems/timer';

TimerController.registerTimer('Update Goal', 1000, handleUpdate);

function handleUpdate() {
    GoalController.update();
}
