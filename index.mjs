//get the content from the rss feed
//save it to a file
//parse the file to populate the database
//repeat at a given interval
//overwrite for now
//try to keep records worth a month

//check against the supplied metadata
//output in log if found a match


import Controller from './controller.mjs'


(async () => {
    let controller = new Controller;
    await controller.run();
})();

