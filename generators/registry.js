// The generators the application can run. `input` says what the interface
// sends: an uploaded .xlsx file, or form fields only.
export const GENERATORS = {
    dpm: { module: './dpm/index.js', input: 'file', extensions: ['.xlsx'] },
    formulaire: { module: './formulaire-dpm/index.js', input: 'file', extensions: ['.xlsx'] },
    takeoff: { module: './takeoff/index.js', input: 'file', extensions: ['.xlsx'] },
    rapport: { module: './rapport-inspection/index.js', input: 'fields' }
};

export const isGenerator = (id) => typeof id === 'string' && Object.hasOwn(GENERATORS, id);

export async function loadGenerator(id) {
    if (!isGenerator(id)) throw new Error(`Générateur inconnu: ${id}`);
    return import(new URL(GENERATORS[id].module, import.meta.url));
}
