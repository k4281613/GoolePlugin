const fs=require('fs');
const path=require('path');
const cheerio=require('cheerio')
const html_path=path.resolve(__dirname,'index.html');
let newfile=null;
function createFile(text){
    let ws=fs.createWriteStream('./static/js/index.js');
    ws.write(text);
    ws.on('drain',function () {
        console.log("内存干了");
    });
    ws.end()
}
fs.readFile(html_path,function (err,data) {
    const $=cheerio.load(data,{decodeEntities:false})
    let script=$('script');
    script.each((index,ele)=>{
        if($(ele).attr('src')===undefined){
            createFile($(ele).html());
            $('body').append('<script src="./static/js/index.js"></script>')
            $(ele).remove();
        }
    })
    newfile=$.html();
    fs.writeFile(html_path,newfile,'utf-8',function (err) {
        if(err){
            console.log(err);
            return false;
        }
        console.log('修改文件完成')
    })
})

