
gCurrNav =  document.querySelector('.gallery')
gCurrPage =  document.querySelector('.image-gallery')


function onClickImage(img){
    
    document.querySelector('.image-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    gCurrPage = document.querySelector('.meme-editor')
    selectedImg(img.src)
    sizeCanvas()
    rendermeme()
    goToEditor()
}
function toggleMenu(){
    document.body.classList.toggle('menu-open')
}
function chnageMode(el){
    
    gCurrNav.classList.remove('active')
    el.classList.add('active')
    gCurrNav = el
}
function goToGallery(el){
    const elGallery  =document.querySelector('.image-gallery')
    gCurrPage.classList.add('hide')
    elGallery.classList.remove('hide')
    gCurrPage = elGallery
    chnageMode(el)
}
function goToEditor(el = document.querySelector('.editor')){
    const elEditor  =document.querySelector('.meme-editor')
    gCurrPage.classList.add('hide')
    elEditor.classList.remove('hide')
    gCurrPage = elEditor
    chnageMode(el)
  
}