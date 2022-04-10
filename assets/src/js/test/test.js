'use strict';
import { globalvariables } from '../env/env';

const sample = () => {
    return console.log(`Welcome ${globalvariables.siteName}`);
}

export { sample };