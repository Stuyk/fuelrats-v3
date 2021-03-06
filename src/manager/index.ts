import * as alt from 'alt-server';
import express from 'express';

const app = express();
const port = 8899;

app.get('/restart/:resourceName', async (req, res) => {
    if (!alt.hasResource(req.params.resourceName)) {
        alt.logWarning(`${req.params.resourceName} is not a resource.`);
        return;
    }

    alt.emitClient(null, 'beforeStop');

    alt.setTimeout(() => {
        alt.restartResource(req.params.resourceName);
    }, 500);
});

alt.on('enable:Entry', () => {
    alt.Player.all.map((player) => {
        const data = player.getMeta('FuelRats:LoginInfo');

        if (!data) {
            player.kick('Core resource has been restarted.');
            return;
        }

        alt.emit('Discord:Login', player, data);
    });
});

app.listen(port);
