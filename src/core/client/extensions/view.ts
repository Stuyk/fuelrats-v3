import * as alt from 'alt-client';
import * as native from 'natives';
import { playFrontendSound } from '../systems/audio';
import EventNames from '../../shared/enums/EventNames';

const blankURL = `http://resource/client/views/empty/html/index.html`;
let _currentEvents: { eventName: string; callback: any }[] = [];
let _cursorCount: number = 0;
let _isClosing: boolean = false;
let _instance: View;

alt.onServer('beforeStop', () => {
    if (_instance) {
        _instance.destroy();
    }

    _instance = null;
    _cursorCount = 0;
    _isClosing = false;
});

alt.onServer(EventNames.TO_CLIENT_INIT_WEBVIEWS, async () => {
    await View.getInstance(blankURL, false, true);
    alt.emitServer(EventNames.TO_SERVER_WEBVIEWS_INITIALIZED);
});

export class View extends alt.WebView {
    private constructor(url: string, isOverlay: boolean = false) {
        super(url, isOverlay);
    }

    /**
     * Return a recycleable WebView instance.
     * @param  {string} url
     * @param  {boolean} addCursor
     * @param {boolean} isInit
     */
    static async getInstance(url: string, addCursor: boolean, isInit: boolean = false): Promise<View> {
        if (!_instance) {
            _instance = new View(url);

            if (isInit) {
                return _instance;
            }
        }

        // Wait for View to close.
        if (_isClosing) {
            await new Promise((resolve: Function) => {
                const tmpInterval = alt.setInterval(() => {
                    if (_isClosing) {
                        return;
                    }

                    alt.clearInterval(tmpInterval);
                    resolve();
                }, 5);
            });
        }

        _instance.url = url;
        _instance.showCursor(addCursor);
        _instance.focus();
        _instance.on('playSound', playFrontendSound);
        native.displayRadar(false);
        return _instance;
    }

    /**
     * Handle data coming from the WebView.
     * @param  {string} eventName
     * @param  {(...args:any[])=>void} listener
     */
    public on(eventName: string, listener: (...args: any[]) => void) {
        super.on(eventName, listener);

        const index: number = _currentEvents.findIndex((e) => e.eventName === eventName);
        if (index >= 0) {
            return;
        }

        _currentEvents.push({ eventName, callback: listener });
    }

    /**
     * Send data to the WebView instance.
     * @param  {string} eventName
     * @param  {any[]} ...args
     */
    public emit(eventName: string, ...args: any[]) {
        super.emit(eventName, ...args);
    }

    /**
     * Show or hide the cursor to the player.
     * @param  {boolean} state
     */
    public showCursor(state: boolean) {
        if (state) {
            _cursorCount += 1;
            try {
                alt.showCursor(true);
            } catch (err) {}
        } else {
            for (let i = 0; i < _cursorCount; i++) {
                try {
                    alt.showCursor(false);
                } catch (err) {}
            }

            _cursorCount = 0;
        }
    }

    /**
     * Closes the WebView and turns off all events.
     */
    public close(delay: number = 0) {
        _isClosing = true;
        this.url = blankURL;
        this.showCursor(false);
        this.unfocus();
        this.isVisible = false;

        native.displayRadar(true);

        // Turn off currently existing events.
        for (let i = 0; i < _currentEvents.length; i++) {
            const eventData = _currentEvents[i];
            super.off(eventData.eventName, eventData.callback);
        }

        _currentEvents = [];
        alt.setTimeout(() => {
            _isClosing = false;
        }, delay);
    }
}
