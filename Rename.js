/**
 * js名称：Rename.js
 * js功能：修改文件夹内的mp4视频文件名，改成和文件夹名称一致的名字；若有的文件夹无视频，则跳过不作处理
 * js进度：100%
 * 缺陷：setTimeout()的执行速度有时会快过dirArr们数据记录的速度，所以有时候会报错找不到路径，
 *       那么可以把5000改成10000或者20000，然后多跑几次。
 * 版本1.0
 */
 const fs = require('fs')
 
 const path = require("path")
 
 const dirArr1 = []       //存放文件夹的名,如:A_Study_of_Generative_Designs_Now_and_Future
 
 const dirArr2 = []      //存放文件的名,如:a study of generative designs now and future_recording.mp4
 
 const dirArr3 = []      //存放带后缀的文件夹名,如:A_Study_of_Generative_Designs_Now_and_Future.mp4
 
 //解析需要遍历的文件夹
  filePath = path.resolve('./aRename(more)')
  
 //调用文件遍历方法
 fileDisplay(filePath)  
 
 //第1步:获取目录（文件夹）名称和目录（文件夹）内的文件名
 function fileDisplay(filePath)
 {
     //根据文件路径读取文件，返回文件列表
     fs.readdir(filePath,(err,files)=>
     {
         if(err)
         {
             console.warn(err)
         }
         else
         {
             //遍历读取到的文件列表
             files.forEach(function(filename)
             {
                 //获取当前文件的绝对路径
                 const filedir = path.join(filePath,filename)
 
                 //根据文件路径获取文件信息，返回一个fs.Stats对象
                 fs.stat(filedir,(eror,stats)=>
                 {
                     if(eror)
                    {  
                        console.warn(eror)
                    }
                         
                     else
                    {
                         isDir = stats.isDirectory() //是文件夹     
                         isFile = stats.isFile()     //是文件
                         if(isDir)
                         {
                            if(isEmptyDir(filedir))  //判断文件夹是否为空
                            { 
                               console.log('文件夹为空，跳过它')
                            } 
                            else
                            {
                              FileDirName = path.basename(filedir)
                             
                              dirArr1.push(FileDirName)//文件夹名称放进去
                             
                              dirArr3.push(FileDirName + '.mp4')

                              //console.log(dirArr1) 
                              
                              fileDisplay(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                                                         
                         }
 
                         if(isFile)
                         {
                             FileNamrWithExct = path.basename(filedir)
                             
                             dirArr2.push(FileNamrWithExct)//文件名放进去
                             
                         }
                         
                     //console.log(dirArr2)

                     }//fs.stat:if/else

                 })//fs.stat
             })//files.forEach
            }//else
     })//fs.readdir
 }//function

//判断目录（文件夹）是否为空
 function isEmptyDir(fPath)
 {
	var pa = fs.readdirSync(fPath)

	if(pa.length === 0){return true} 
    
    else {return false}
}

 // 第2步:修改文件名称
 setTimeout(() => 
 {
        for ( i = 0; i < dirArr1.length; i++) 
        {              
            //本质就是路径拼接
            fs.rename(path.join(filePath,dirArr1[i],dirArr2[i]), path.join(filePath,dirArr1[i],dirArr3[i]), (err) => 
                {
                     
                    if (err) {console.log(err)}

                    else {console.log('恭喜恭喜恭喜你!重命名成功!')}
                })
        }
},5000)
   /**
    * 主要思路：
    * 1.若目录内无文件，则跳过（此时终端会有提示）；否则执行步骤2
    * 2.遍历文件目录，用dirArr1存放文件目录名，用dirArr3存放加了“.mp4”后缀的文件目录名，执行步骤3
    * 3.遍历文件目录内的文件，用dirArr2记录文件名，执行步骤4
    * 4.遍历dirArr1(因为在编写时就可以确定dirArr1、dirArr2、dirArr3长度一致)使用fs.rename修改名字
    * 5.结束
    */

