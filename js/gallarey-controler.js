



function onClickImage(img){
    document.querySelector('.image-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    selectedImg(img.src)
    sizeCanvas()
    rendermeme()
}