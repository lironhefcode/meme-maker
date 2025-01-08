
gCurrNav =  document.querySelector('.gallery')
gCurrPage =  document.querySelector('.image-gallery')


function onClickImage(img){
    
    document.querySelector('.image-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    gCurrPage = document.querySelector('.meme-editor')
    selectedImg(img.src)
    sizeCanvas()
    rendermeme()
}
function toggleMenu(){
    document.body.classList.toggle('menu-open')
}
function chnageMode(el){
    
    gCurrNav.classList.remove('active')
    el.classList.add('active')
    gCurrNav = el
}
function goToGallery(){
    const elGallery  =document.querySelector('.image-gallery')
    gCurrPage.classList.add('hide')
    elGallery.classList.remove('hide')
    gCurrPage = elGallery
}
function goToEditor(){

}