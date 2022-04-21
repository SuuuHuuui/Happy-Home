/**
 * js名称：RW_Data.js
 * js功能：完成Json数据->excel的导入（其实就是用它填表了昂）
 * js进度：100%
 * 注意事项：json2xls使用之前要在cmd打"npm install json2xls"
 */

const fs = require('fs')                //fs模块

const json2xls = require('json2xls');   //json2xls模块

try 
{
    const data1 = fs.readFileSync('./session.json', 'utf8');//此处决定读的是什么Json文件
    
    const config1 = JSON.parse(data1);
    
    const config1Array = []
    
    config1.forEach(element => 
    {
        let temp = 
        {
            'FileName' : element.pptFolderName + ".mp4",
            'YourName' : element.presenter,
            'YourEmail' : "danie.li@autodesk.com",
            'Title' : element.presentation,
            'Description' : element.abstract,
            'Language' : "",
            'Category' : "",
            'slug' : element.session + "-" + element.roomCode,
            'Session Code' : element.session,
            'Room Code' : element.roomCode,
            'Has Recording' : element.recording

        }

        config1Array.push(temp)

    });

    let xls = json2xls(config1Array)
    
    fs.writeFileSync('./info2020.xlsx',xls,'binary')//此处决定写在哪个表里

    console.log("恭喜恭喜恭喜你！写入成功！")
    
} 
catch (err) 
{
    console.log(`Error reading file from disk: ${err}`);
}