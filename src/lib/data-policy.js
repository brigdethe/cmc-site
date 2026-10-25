// Treat explicit Data Saver and metered-speed connections conservatively.
export function shouldSaveData(connection = globalThis.navigator?.connection) {
 return Boolean(connection && (connection.saveData || ['slow-2g','2g','3g'].includes(connection.effectiveType) || (connection.downlink > 0 && connection.downlink <= 1.5)));
}
export function allowBackgroundVideo() {
 return !shouldSaveData() && !globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}
