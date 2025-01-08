



function onClickImage(img){
    selectedImg(img.src)
    rendermeme()
   document.querySelector('.image-gallery').classList.add('hide')
   document.querySelector('.meme-editor').classList.remove('hide')
}