
import xmlParser from 'fast-xml-parser';
import Entities from 'html-entities';
import htmlParser from 'node-html-parser';

import Logger from './logger.mjs';
import VulnerabilitiesDataStore from './vulnerabilitiesdatastore.mjs';


class RSSParser {
    constructor() {
        this._logger = new Logger();
        this._title = null;
        this._data = new VulnerabilitiesDataStore();
    }

    //will only give first item in the rss feed which is current week
    //populates members
    parse(rss) {
        let decodeHTMLContent = '<body>' + this._decodeHTML(this._parseXML(rss)) + '</body>';
        this._parseHTML(decodeHTMLContent);
        return this._data;
    }

    //mutator
    _parseXML(rss) {
        let parsedRSS = xmlParser.parse(rss);
        let currentItems = parsedRSS.rss.channel.item;
        if (currentItems && currentItems.length > 1) {
            let currentItem = currentItems[0];//taking first item only
            this._logger.log(currentItem.title);
            this._title = currentItem.title;
            return currentItem.description;
        } else {
            throw new Error('items not found in rss feed. Please check feed');
        }
        return '';//should never reach here

    }

    //i dont like this low level parsing, will change for a better alternatvie in future
    _parseHTML(htmlString) {
        //current xpath is body.div[i].table.tbody.tr[j].td[1-5]
        let cleanedHtmlString = htmlString.replace(/(\\t|\\n|&nbsp;)/gi,'');
        let root = htmlParser.parse(htmlString);
        let divs = root.querySelectorAll('div');
        if (divs) {
            for (let div of divs) {
                let table = div.querySelector('table');
                if (!table) {
                    continue;
                }

                let tbody = table.querySelector('tbody');
                if (!tbody) {
                    continue;
                }

                let rows = tbody.querySelectorAll('tr');
                if (!rows) {
                    continue;
                }
                for (let row of rows) {
                    let cols = row.querySelectorAll('td');
                    //take 5 cols from here
                    this._data.add(cols[0].rawText, cols[1].rawText, cols[2].rawText, cols[4].rawText);
                }
            }
        }
    }

    _decodeHTML(encoded) {
        const decoder = new Entities.AllHtmlEntities();
        let decoded = decoder.decode(encoded);
        return decoded;
    }

}

export default RSSParser;