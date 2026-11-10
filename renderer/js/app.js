// Interface entry point.
import { setupFileDrops } from './files.js';
import { bindGeneratorForm } from './form.js';
import { rapport } from './modules/rapport.js';
import { dpm, formulaire, takeoff } from './modules/spreadsheet.js';
import { setupShell, t } from './shell.js';

const MODULES = { dpm, formulaire, takeoff, rapport };
const api = window.api;

setupFileDrops();
const forms = [...document.querySelectorAll('form[data-module]')].map((form) =>
    bindGeneratorForm(form, MODULES[form.dataset.module](form), { t, api }));
setupShell(api, { onLanguage: () => forms.forEach((f) => f.refresh()) });
