'use strict'
var gElCanvas = document.querySelector('canvas')
var gCtx 

function rendermeme(){
  
    const img = new Image()
    img.src = getImg()
    img.onload = () =>{
    const meme = getMeme()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    let space =0
    meme.lines.forEach(line => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        if(line.location){
            const {xStart,yStart} = line.location
            gCtx.fillText(line.txt,xStart,yStart)
            if(line.selected)  gCtx.strokeRect(xStart-2,5+yStart,gCtx.measureText(line.txt).width+10,-line.size -2)
            addLocation(xStart,yStart,gCtx.measureText(line.txt).width+xStart,yStart-line.size,line)
        }else{
            console.log('no')
            gCtx.fillText(line.txt,10+space,80+space)
            addLocation(10+space,80+space-line.size,gCtx.measureText(line.txt).width,80+space,line)
            if(line.selected)  gCtx.strokeRect(5+space,84+space,gCtx.measureText(line.txt).width+10,-line.size +3)
        } 
        
           
        
        
        space += 20
    });
    }
   
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
    changeLine()
    rendermeme()
    changeValues()
}

function changeValues(){
    document.querySelector('.font-value').value = getFont()
  document.querySelector('.Meme-text').value = getText()
  document.querySelector('.color-picker').value = getColor()
    
    
}
function onChangeLine(){
    changeLine()
    changeValues()
    rendermeme()
}
function onChangeFont(font){
    setFont(font)
    rendermeme()
}
function getPos(ev){
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
function sizeCanvas(){
    const elContainer = document.querySelector('.canvas-container') 
    
    gElCanvas.width = elContainer.clientWidth; // Use clientWidth for actual width
    gElCanvas.height = elContainer.clientHeight; 
    gCtx = gElCanvas.getContext('2d')
    const meme = getMeme()
    if(meme.selectedImgId !== 0) rendermeme()   
    } 

function onDown(ev){
   const pos = getPos(ev)
   console.log(pos)
   isTextClick(pos)
   rendermeme()
}
function onMove(ev){
    
  if (!isDrag()) return
  const pos = getPos(ev)
  const meme = getMeme()
  const{xStart,yStart} = meme.lines[meme.selectedLineIdx].location
        
  // console.log('pos:', pos)
  // Calc the delta, the diff we moved
  const dx = pos.x - xStart
  const dy = pos.y - yStart
  changeStartLocation(pos.x,pos.y)

  
  // Save the last pos, we remember where we`ve been and move accordingly
  
  // The canvas is render again after every move
  rendermeme()
}
function onUp(){
    
    setLineDragOff()
}