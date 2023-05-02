const PICS_CNT = 10;

const URL = `https://api.thecatapi.com/v1/images/search?limit=${PICS_CNT}`;

let slideIndex = 1;

fetch(URL)
.then((response) => {
    return response.json();
 })
.then((data) => {
    let imagesData = data;
    let current = PICS_CNT;
    imagesData.map(function(imageData) {
        let cur_pic = current--;

        let image = document.createElement('img');
        image.src = `${imageData.url}`;
        image.classList.add('pic');
        
        let num = document.createElement('div');
        num.classList.add('caption-text');
        num.textContent = `${cur_pic} / ${PICS_CNT}`

        let slide = document.createElement('div');
        slide.classList.add('pic-slide');
        slide.classList.add('fade');
        slide.appendChild(image);
        slide.appendChild(num);
        document.getElementById('slideshow-container').prepend(slide);

        let dot = document.createElement('span');
        dot.classList.add('dot');
        dot.id = cur_pic;
        dot.onclick = () => { setSlide(cur_pic); };
        document.getElementById('dots-container').prepend(dot);
        
    });
    showSlides(slideIndex);
})
.catch(function(error) {
   console.log(error);
});


function turnSlide(n) {
  showSlides(slideIndex += n);
}


function setSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("pic-slide");
    
    if (n > slides.length)
        slideIndex = 1;
    if (n < 1)
        slideIndex = slides.length;

    for (let slide of slides)
        slide.style.display = "none";
    slides[slideIndex-1].style.display = "block";

    let dots = document.getElementsByClassName("dot");
    for (let dot of dots)
        dot.className = dot.className.replace(" active", "");
    dots[slideIndex-1].className += " active";
} 
