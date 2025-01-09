var gImgs = [{id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat']},
{id:2, url: 'imgs/2.jpg', keywords: ['funny', 'cat']},
{id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat']},
{id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat']}] 
var gMeme = { 
selectedImgId: 0, 
selectedLineIdx: 0, 
lines: [ {
    txt : 'add text',
    color : '#000000',
    size: 24,
    font: 'arial',
    selected : true,
    isDrag : false
}
  
] 
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
    console.log(xStart,yStart,xEnd,yEnd)
    line['location'] ={xStart,yStart,xEnd,yEnd,line}
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
    if(gMeme.selectedLineIdx>= gMeme.lines.length ){
        gMeme.selectedLineIdx = 0
    }
    gMeme.lines[gMeme.selectedLineIdx].selected = true
}
function aliganLeft(alignTo){
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