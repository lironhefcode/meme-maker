var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keyword: 'funny' },
    { id: 2, url: 'imgs/2.jpg', keyword: 'funny' },
    { id: 3, url: 'imgs/3.jpg', keyword: 'funny' },
    { id: 4, url: 'imgs/4.jpg', keyword: 'happy' },
    { id: 5, url: 'imgs/5.jpg', keyword: 'happy' },
    { id: 6, url: 'imgs/6.jpg', keyword: 'happy' },
    { id: 7, url: 'imgs/7.jpg', keyword: 'sad' },
    { id: 8, url: 'imgs/8.jpg', keyword: 'sad' },
    { id: 9, url: 'imgs/9.jpg', keyword: 'sad' },
    { id: 10, url: 'imgs/10.jpg', keyword: 'weird' },
    { id: 11, url: 'imgs/11.jpg', keyword: 'weird' },
    { id: 12, url: 'imgs/12.jpg', keyword: 'weird' },
    { id: 13, url: 'imgs/13.jpg', keyword: 'best' },
    { id: 14, url: 'imgs/14.jpg', keyword: 'best' },
    { id: 15, url: 'imgs/15.jpg', keyword: 'best' },
    { id: 16, url: 'imgs/16.jpg', keyword: 'funny' },
    { id: 17, url: 'imgs/17.jpg', keyword: 'happy' },
    { id: 18, url: 'imgs/18.jpg', keyword: 'sad' }
]
var gKeywordSearchCountMap = {'funny': 20,'happy': 20, 'sad': 20,'weird':20,'best':20} 
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
function addLine(txt){
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
    if (gMeme.lines.length===0) return
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
function randomMeme(){
    init()
    gMeme.lines[gMeme.selectedLineIdx].txt = getRandomText()
    gMeme.selectedImgId = getRandomInt(0,gImgs.length-1)
}
function getImages(){
    return gImgs
}

function getFillterdImages(fillterby){
    return gImgs.filter(img => img.keyword.includes(fillterby))
}
function addImage(url){
    gImgs.push({ id: gImgs.length+1, url , keyword: 'sad' })
    init()
    gMeme.selectedImgId = gImgs.length
}
function updateWordSize(word){
    return gKeywordSearchCountMap[word]++ 

}