import fs from 'fs'
import axios from 'axios';

import Logger from './logger.mjs';
import constants from './constants.mjs';
import Enums from './enums.mjs';

class RSSManager {

    constructor() {
        //get url from config file
        this.rssData = null;
        this.logger = new Logger();
        this.file = fs.promises;
    }

    //fetch should happen at the begining of each week,it must be controlled by a controller
    //fetch will
    async fetch(getFromRemote) {
        if (getFromRemote === Enums.RSSSource.REMOTE) {
            return await this._fetchFromRemote();
        } else {
            return await this._fetchFromLocal();
        }
    }



   async _fetchFromRemote() {
        try {
            let rawData = await axios.get('https://us-cert.cisa.gov/ncas/bulletins.xml');
            if (rawData && rawData.data && rawData.status == 200) {
                let rawDataString = JSON.stringify(rawData.data);
                await this.file.writeFile(constants.RSS_FILE_NAME, rawDataString);
                return rawDataString;
            } else {
                throw new Error("bad data recieved from server, the file is left to its original state");
            }
        } catch (err) {
            console.error(err);
            //handle excpetion
            throw err;
        }
    }

    async _fetchFromLocal(){
        const data = await this.file.readFile(constants.RSS_FILE_NAME, "binary");
        return data;
    }
}

export default RSSManager;