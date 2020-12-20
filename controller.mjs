import RSSManager from './rssmanager.mjs';
import enums from './enums.mjs';
import Logger from './logger.mjs';
import RSSParser from './rssparser.mjs';
import MetadataParser from './metadataparser.mjs';

class Controller{

    async run(){
        let rssManager = new RSSManager();
        let rssParser = new RSSParser();
        const rssData = await rssManager.fetch(enums.RSSSource.LOCAL);//TODO - how often to hit the remote vs local?
        let dataObject = rssParser.parse(rssData);//can make it async in future if need arise
        //get metadata
        let metadataParser = await new MetadataParser();
        let metadata = await metadataParser.readFile();
        //filter dataObject to contain only metaData entries

        dataObject.filter((item)=>{
           //search product name  in meta data entries
           for(let metadataEntry of metadata){
                if(item.product.search(metadataEntry) >=0){
                    console.log('***************************')
                    console.log('match!!!!');
                    console.log(item.product + ':::' + metadataEntry);
                    console.log('**************************');
                    return true;
                }
           }
           return false;
        });
        

    
    }
}

export default Controller;