var gImgs = [{id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat']},
{id:2, url: 'imgs/2.jpg', keywords: ['funny', 'cat']},
{id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat']},
{id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat']}] 
var gMeme = { 
selectedImgId: 0, 
selectedLineIdx: 0, 
lines: [ 
  
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
        color : 'black',
        size: 24,
        selected : (gMeme.lines.length === 0)
    }
    )
}
function getText(){
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function changeLine(){
    console.log(gMeme.selectedLineIdx ===  gMeme.lines.length-1)
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
    console.log(line)
    line['location'] ={xStart,yStart,xEnd,yEnd}
}