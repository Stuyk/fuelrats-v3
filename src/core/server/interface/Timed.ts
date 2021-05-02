export interface ITimed {
    name?: string;
    nextUpdate?: number;
    callback: Function;
    timeBetweenUpdates: number;
}
