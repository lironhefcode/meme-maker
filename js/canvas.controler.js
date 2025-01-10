'use strict'
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

function rendermeme() {

    const img = new Image()
    img.src = getImg()
    img.onload = () => {
        const meme = getMeme()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        let space = 0
        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            if (line.location) {
                const { xStart, yStart } = line.location
                gCtx.fillText(line.txt, xStart, yStart)
                if (line.selected) gCtx.strokeRect(xStart - 2, 5 + yStart, gCtx.measureText(line.txt).width + 10, -line.size - 2)
                addLocation(xStart, yStart, gCtx.measureText(line.txt).width + xStart, yStart - line.size, line)
            } else {

                gCtx.fillText(line.txt, 10 + space, 80 + space)
                addLocation(10 + space, 80 + space - line.size, gCtx.measureText(line.txt).width, 80 + space, line)
                if (line.selected) gCtx.strokeRect(5 + space, 84 + space, gCtx.measureText(line.txt).width + 10, -line.size + 3)
            }
            space += 20
        });
    }

}
function onAddtext(text) {
    addLine(text)
    rendermeme()
}
function onchangeColor(color) {

    setColor(color)
    rendermeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'your-Meme'
    return dataUrl
}
function onIncreaseFont() {
    increaseFont()
    rendermeme()

}
function oDencreaseFont() {
    decreaseFont()
    rendermeme()
}
function onAddLine() {
    _createLine()
    changeLine()
    rendermeme()
    changeValues()
}

function changeValues() {

    document.querySelector('.font-value').value = getFont()
    document.querySelector('.Meme-text').value = getText()
    document.querySelector('.color-picker').value = getColor()
}
function onChangeLine() {
    changeLine()
    changeValues()
    rendermeme()
}
function onChangeFont(font) {
    setFont(font)
    rendermeme()
}
function getPos(ev) {
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
function sizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth; // Use clientWidth for actual width
    gElCanvas.height = elContainer.clientHeight;
    gCtx = gElCanvas.getContext('2d')
    const meme = getMeme()
    if (meme.selectedImgId !== 0) rendermeme()
}

function onDown(ev) {
    const pos = getPos(ev)

    isTextClick(pos)
    rendermeme()
}
function onMove(ev) {

    if (!isDrag()) return
    const pos = getPos(ev)
    const meme = getMeme()
    const { xStart, yStart } = meme.lines[meme.selectedLineIdx].location


    const dx = pos.x - xStart
    const dy = pos.y - yStart
    changeStartLocation(pos.x, pos.y)
    rendermeme()
}
function onUp() {

    setLineDragOff()
}
function onDelteLine() {
    delteLine()
    rendermeme()
}

function onAliganLeft() {
    aliganLeft()
    rendermeme()
}
function onAliganCenter() {
    aligan(gElCanvas.width / 2)
    rendermeme()
}
function onAliganCenter() {
    aliganCenter(gElCanvas.width / 2, gCtx)
    rendermeme()
}
function onAliganRight() {
    aliganRight(gElCanvas.width, gCtx)
    rendermeme()
}

function onShare(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')


    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)


    }

    uploadImg(canvasData, onSuccess)
}
async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}
function onSaveImage() {
    saveImage(gElCanvas.toDataURL())
}

function renderSaved(ClikedImg) {
    gCtx.drawImage(ClikedImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
function onRandom(){
   randomMeme()
   sizeCanvas()
   rendermeme()
}
function onAddEmoji(elbutton){
   onAddLine()
   addLine(elbutton.innerText)
   changeValues()
   rendermeme()
}
function addToCanvas(url){
    addImage(url)
    sizeCanvas()
    rendermeme()
}