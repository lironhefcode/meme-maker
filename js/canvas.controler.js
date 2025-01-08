'use strict'
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

function rendermeme(){
  
    const img = new Image()
    img.src = getImg()
    const meme = getMeme()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    let space =0
    meme.lines.forEach(line => {
        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
       
        gCtx.fillText(line.txt,10+space,80+space)
        if(line.selected)  gCtx.strokeRect(5+space,84+space,gCtx.measureText(line.txt).width+10,-line.size +3)
            console.log(line)
        addLocation(10+space,80+space-line.size,gCtx.measureText(line.txt).width,80+space,line)
        
        space += 20
    });
}   
function onAddtext(text){
    addLine(text)
    rendermeme()    
}
function onchangeColor(color){
    console.log(color)
    setColor(color)
    rendermeme()
}

function onDownloadMeme(elLink){
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'your-Meme'
    return dataUrl
}
function onIncreaseFont(){
    increaseFont()
    rendermeme()
    
}
function oDencreaseFont(){
    decreaseFont()
    rendermeme()
}
function onAddLine(){
    _createLine()
    rendermeme()
    changeTextValue()
}
function changeTextValue(){
    const elText = document.querySelector('.Meme-text')
    elText.value = getText()
}
function onChangeLine(){
    changeLine()
    changeTextValue()
    rendermeme()
}
function onDown(ev){
   const pos = getPos(ev)
   isTextClick(pos)
   rendermeme()
}
function getPos(ev){
    return  {
        x: ev.offsetX,
        y: ev.offsetY,
      }
}