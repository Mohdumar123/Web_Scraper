const req = require("request"); 
const cheerio = require("cheerio"); 
const getIssuesPageHtml = require("./issues");

function getReposePageHtml(url,topic){
    req(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("Page not found");
         }else{
           getResponseLinke(html);
        // console.log(html);
        }
    }
    function getResponseLinke(html){
        let $ = cheerio.load(html);
         let headingArr = $('.f3.color-fg-muted.text-normal.lh-condensed');
         console.log(topic);
         for(let i=0;i<8;i++){
            let towAnchor = $(headingArr[i]).find("a");
            let link = $(towAnchor[1]).attr("href");
            // console.log(link);
            let fullLink = 'https://github.com'+link+'/issues';
            let repoName = link.split("/").pop();
            getIssuesPageHtml(fullLink,topic,repoName);
         }
         console.log("--------------------------------------------");
    }
}

module.exports = getReposePageHtml;