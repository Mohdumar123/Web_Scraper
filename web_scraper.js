let url = "https://github.com/topics";
const req = require("request"); //use for requesting url from server
const cheerio = require("cheerio"); //use for web scraping
req(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
    }
}