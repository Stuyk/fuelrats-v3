import * as alt from 'alt-server';
import EventNames from '../../shared/enums/EventNames';
import { DEFAULT_CONFIG } from '../configuration/config';
import { IDiscord } from '../interface/Discord';
import { openSelection } from '../views/selection';

function handleDiscordLogin(player: alt.Player, discord: IDiscord) {
    player.model = 'mp_m_freemode_01';
    player.spawn(
        DEFAULT_CONFIG.VEHICLE_SELECT_SPAWN.x,
        DEFAULT_CONFIG.VEHICLE_SELECT_SPAWN.y,
        DEFAULT_CONFIG.VEHICLE_SELECT_SPAWN.z,
        0
    );

    player.discord = discord;
    player.joinTime = Date.now();
    player.displayName = `(${player.id}) ${discord.username}#${discord.discriminator}`;
    player.setMeta('FuelRats:LoginInfo', discord);

    alt.emitClient(player, EventNames.TO_CLIENT_INIT_WEBVIEWS);
}

function handleWebviewsInitialized(player: alt.Player) {
    player.setDateTime(0, 0, 0, 9, 0, 0);
    player.setSyncedMeta(EventNames.META_NAME, player.displayName);
    player.setSyncedMeta(EventNames.META_READY, false);
    player.setSyncedMeta(EventNames.META_SCORE, 0);
    player.setSyncedMeta(EventNames.META_CANISTER, false);

    openSelection(player);
}

alt.on(EventNames.DISCORD_LOGIN_EVENT, handleDiscordLogin);
alt.onClient(EventNames.TO_SERVER_WEBVIEWS_INITIALIZED, handleWebviewsInitialized);
alt.emit('enable:Entry');
