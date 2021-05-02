import * as alt from 'alt-client';
import * as native from 'natives';

const MAX_ATTEMPTS = 200;

export async function loadModel(model: string): Promise<boolean> {
    const hash = alt.hash(model);
    native.requestModel(hash);
    let attempts = 0;

    return new Promise((resolve) => {
        const modelInterval = alt.setInterval(() => {
            if (attempts > MAX_ATTEMPTS) {
                alt.clearInterval(modelInterval);
                resolve(false);
                return;
            }

            if (!native.hasModelLoaded(hash)) {
                attempts += 1;
                return;
            }

            alt.log(`Loaded Model: ${model}`);
            alt.clearInterval(modelInterval);
            resolve(true);
            return;
        }, 100);
    });
}
