
var gCurrNav =  document.querySelector('.gallery')
var gCurrPage =  document.querySelector('.image-gallery')

function onIinit(){
    renderGallery()
}

function onClickImage(img){
    
    document.querySelector('.image-gallery').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    gCurrPage = document.querySelector('.meme-editor')
    selectedImg(img.src)
    sizeCanvas()
    init()
    changeValues()
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
function goToSaved(el){
    chnageMode(el)
    const elSaved = document.querySelector('.saved-meme')
    elSaved.classList.remove('hide')
    gCurrPage.classList.add('hide')
    gCurrPage = elSaved
    const images = getSavedImages()
    
    let strHtml =''
    images.forEach((image,index) => {
      strHtml +=  `<article class="meme-image" onclick="onClikedSavedImg(${index})"> 
                <img src="${image.url}" > 
            </article>`
    });
    document.querySelector('.saved-meme-content').innerHTML = strHtml
}
function onClikedSavedImg(index){
    document.querySelector('.saved-meme').classList.add('hide')
    document.querySelector('.meme-editor').classList.remove('hide')
    gCurrPage = document.querySelector('.meme-editor')
    sizeCanvas()
    setMemeToSaved(index)
    rendermeme()
}



function renderGallery(imgs =  getImages()){
    
    let strHtml =` <label class="file-input-label rounded" for="file-upload">Upload image</label>
            <input type="file" class="file-upload" id="file-upload" oninput="onImgInput(event)">`
    imgs.forEach((image) => {
      strHtml +=  `<article class="meme-image " > 
                <img src="${image.url}" class="rounded" onclick="onClickImage(this)" > 
            </article>`
    });
    document.querySelector('.gallery-content').innerHTML = strHtml
}


function onFillterGallery(fillerBy){
   
    renderGallery(getFillterdImages(fillerBy))
}


function onImgInput(ev) {
    loadImageFromInput(ev)
}

function loadImageFromInput(ev) {
    // document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            goToEditor()
            addToCanvas(img.src)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
    
}

function onKeyWordClick(elWord){
      const word =  elWord.innerText
      elWord.style.fontSize = updateWordSize(word) + 'px'
      
      document.querySelector('.fillter-meme').value = word
      onFillterGallery(word)
}