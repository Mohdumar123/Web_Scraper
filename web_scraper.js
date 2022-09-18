let url = "https://github.com/topics";
const req = require("request"); //use for requesting url from server
const cheerio = require("cheerio"); //use for web scraping
const getReposePageHtml = require("./repospage");
req(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode == 404){
        console.log("Page not found");
     }else{
       getTopicLink(html);
    // console.log(html);
    }
}

function getTopicLink(html){
   let $ = cheerio.load(html);
   let linkEleArr = $('.no-underline.d-flex.flex-column.flex-justify-center');
   for(let i=0;i<linkEleArr.length;i++){
        let href = $( linkEleArr[i]).attr("href");
        // console.log(href);
       let topic = href.split("/").pop();
        let fullLink = "https://github.com/"+href;
        // console.log(fullLink);
        getReposePageHtml(fullLink,topic);
   }

}