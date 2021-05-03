Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            vehicles: ['infernus'],
        };
    },
    methods: {
        next() {
            this.vehicles.push(this.vehicles.shift());
            this.update();
        },
        prev() {
            this.vehicles.unshift(this.vehicles.pop());
            this.update();
        },
        update() {
            if (!('alt' in window)) {
                return;
            }

            alt.emit('selector:SetSelection', this.vehicles[0]);
            alt.emit('playSound', 'NAV_LEFT_RIGHT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
        },
        select() {
            if (!('alt' in window)) {
                return;
            }

            alt.emit('selector:Select', this.vehicles[0]);
            alt.emit('playSound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
        },
        setVehicles(vehicles) {
            this.vehicles = vehicles;
            this.update();
        },
    },
    mounted() {
        if ('alt' in window) {
            alt.on('selector:SetVehicles', this.setVehicles);

            setTimeout(() => {
                alt.emit('selector:Ready');
            }, 1500);
        }
    },
});
