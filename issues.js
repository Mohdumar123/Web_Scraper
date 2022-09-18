const req = require("request"); 
const cheerio = require("cheerio"); 
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesPageHtml(url,topic,repoName){
    req(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode == 404){
           console.log("Page not found");
        } else{
           getIssues(html);
        // console.log(html);
        }
    }

    function getIssues(html){
    let $ = cheerio.load(html);
   let issueEleArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
     let Arr = [];
     console.log(issueEleArr.length);
     for(let i=0; i<issueEleArr.length; i++){
     let link = $(issueEleArr[i]).attr("href");
    //  console.log(link);
     Arr.push(link);
     }    
    //  console.log(topic,"     ",Arr);
     let folderPath = path.join(__dirname,topic);
     dirCreated(folderPath);
     let filePath = path.join(folderPath,repoName + ".pdf");
     let pdfDoc = new pdfkit();
     let text = JSON.stringify(Arr);
     pdfDoc.pipe(fs.createWriteStream(filePath));
     pdfDoc.text(text);
     pdfDoc.end();
    //  fs.writeFileSync(filePath,);
}
}

module.exports = getIssuesPageHtml;

function dirCreated(folderPath){
    if(fs.existsSync(folderPath) == false){
         fs.mkdirSync(folderPath);
    }
}