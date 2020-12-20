
import fs from 'fs';
import readline from 'readline';

import constants from './constants.mjs'
class MetadataParser {

    constructor() {
        this._data = new Array();

    }

    //reading file line by line and populating the set with string entries
    async readFile() {
        const fileStream = fs.createReadStream(constants.META_FILE_NAME);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
           this._data.push(line);
        }

        return this._data;
    }


}

export default MetadataParser;