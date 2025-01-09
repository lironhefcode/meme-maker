var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'dog'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['cute', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat', 'sleep'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['adorable', 'dog'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['playful', 'dog'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['lazy', 'cat'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['curious', 'dog'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat', 'jump'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['cute', 'rabbit'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['playful', 'kitten'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['adorable', 'puppy'] }
  ]
var gMeme = { 
selectedImgId: 0, 
selectedLineIdx: 0, 
lines: [ 
] 
} 
const STORAGE_KEY = 'imagedb'

function saveImage(imgUrl){
    const imgData = loadFromStorage(STORAGE_KEY) 
    imgData.push({'meme':gMeme,'url':imgUrl})
    console.log(imgData)
    saveToStorage(STORAGE_KEY,imgData)
}
function getSavedImages(){
    return loadFromStorage(STORAGE_KEY)
}
function init(){
    gMeme.lines = [ {
        txt : 'add text',
        color : '#000000',
        size: 24,
        font: 'arial',
        selected : true,
        isDrag : false
    }
      
    ] 
    gMeme.selectedLineIdx =0
}
function getMeme(){
    return gMeme
}
function selectedImg(src){
    gMeme.selectedImgId = gImgs.find(img => src.includes(img.url) ).id
}
function getImg(){
    return gImgs.find(img => gMeme.selectedImgId ===  img.id).url
}
function addLine(txt,){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function setFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font
}
function setColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color =color
}
function increaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}
function decreaseFont(){
    if(gMeme.lines[gMeme.selectedLineIdx].size < 10) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}
function _createLine(){
   gMeme.lines.push( {
        txt : 'add text',
        color : '#000000',
        size: 24,
        font: 'arial',
        selected : (gMeme.lines.length === 0),
        isDrag : false
    }
    )
}
function getColor(){
    return gMeme.lines[gMeme.selectedLineIdx].color
}
function getText(){
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function getFont(){
    return gMeme.lines[gMeme.selectedLineIdx].font
}
function changeLine(){
   
    if(gMeme.selectedLineIdx ===  gMeme.lines.length-1){
        gMeme.lines[gMeme.selectedLineIdx].selected = false
        gMeme.selectedLineIdx = 0
        gMeme.lines[gMeme.selectedLineIdx].selected = true
        
    }else {
        gMeme.lines[gMeme.selectedLineIdx].selected = false
        gMeme.selectedLineIdx += 1
        gMeme.lines[gMeme.selectedLineIdx].selected = true
    }
    
}
function addLocation(xStart,yStart,xEnd,yEnd,line){
    
    line['location'] ={xStart,yStart,xEnd,yEnd}
}
function isTextClick(clickedPos){
    
    gMeme.lines.forEach((line,index) =>{
        const {xStart,yStart,xEnd,yEnd} = line.location
        
        if((clickedPos.x>xStart&&clickedPos.x<xEnd)&&clickedPos.y<yStart&&clickedPos.y>yEnd){
            deslectLine()
            line.selected = true
            line.isDrag = true
            gMeme.selectedLineIdx = index
            changeValues()
        }
    })
   
}
function deslectLine(){
    gMeme.lines[gMeme.selectedLineIdx].selected = false
}
function setLineDragOff(){
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false
}
function isDrag(){
   return gMeme.lines[gMeme.selectedLineIdx].isDrag
}
function changeStartLocation(xStart,yStart){
    gMeme.lines[gMeme.selectedLineIdx].location.xStart = xStart
    gMeme.lines[gMeme.selectedLineIdx].location.yStart = yStart
}

function  delteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    if(gMeme.lines.length === 0) return
    if(gMeme.selectedLineIdx>= gMeme.lines.length ){
        gMeme.selectedLineIdx = 0
    }
    gMeme.lines[gMeme.selectedLineIdx].selected = true
}
function aliganLeft(){
    gMeme.lines.forEach(line =>
        line.location.xStart = 10
    )
}
function aliganCenter(center,ctx){
    gMeme.lines.forEach(line =>
        line.location.xStart = center- (ctx.measureText(line.txt).width/2)
    )
}
function aliganRight(width,ctx){
    gMeme.lines.forEach(line =>
        line.location.xStart = width- (ctx.measureText(line.txt).width)
    )
}


function setMemeToSaved(idx){
    const savedImages  = loadFromStorage(STORAGE_KEY)
    gMeme = savedImages[idx].meme
}