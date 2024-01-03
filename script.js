const slideButton = document.getElementsByClassName("button");
const imageList= document.getElementById("image-list");
const slideBar= document.getElementById("slide-bar");
const slideThumb= document.getElementById("slide-thumb");
const maxScroll = imageList.scrollWidth - imageList.clientWidth; 

slideThumb.addEventListener("mousedown" , (e)=>{
    const startX = e.clientX;
    const thumbPosition = slideThumb.offsetLeft;
    
//    handleMouseMove  
    const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        let newthumbPosition = thumbPosition + deltaX;

        const maxthumbPosition = slideBar.getBoundingClientRect().width - slideThumb.offsetWidth;
        const boundedthumbPosition = Math.max(0 , Math.min(maxthumbPosition , newthumbPosition));
        const scrollPosition = (boundedthumbPosition /maxthumbPosition) * maxScroll;
        slideThumb.style.left = `${boundedthumbPosition}px`;    
        imageList.scrollLeft = scrollPosition ; 
    }


    // handleMouseUp
  const handleMouseUp = (e) =>{

      document.removeEventListener("mousemove" ,handleMouseMove);
      document.removeEventListener("mouseup" ,handleMouseUp);
  }
    
    document.addEventListener("mousemove" ,handleMouseMove);
    document.addEventListener("mouseup" ,handleMouseUp);
})

// Button

Array.from(slideButton).forEach(button => {
   button.addEventListener("click" , ()=>{
    const direction = button.id === "button-left" ? -1 : 1;
    const scrollAmount = imageList.clientWidth * direction;
    imageList.scrollBy({ left : scrollAmount, behavior : "smooth"})

   })

   const handleSlideButtons = () =>{
    slideButton[0].style.display  = imageList.scrollLeft <= 0 ?  "none" : "block";
    slideButton[1].style.display  = (imageList.scrollLeft+1) >= maxScroll ?  "none" : "block";
}

// Update Scroll Bar
 const updateScrollBar = () =>{
     const scrollPosition = imageList.scrollLeft;
     const thumbPosition = (scrollPosition/maxScroll) * (slideBar.clientWidth - slideThumb.clientWidth);
     slideThumb.style.left = `${thumbPosition}px`;
}
imageList.addEventListener("scroll" , ()=>{
    handleSlideButtons();
    updateScrollBar();
})
});

// Time Interval

    let interval = setInterval(() => {
        const scrollAmount = imageList.clientWidth;
        imageList.scrollBy({ left : scrollAmount, behavior : "smooth"})  
    }, 2000);

        setTimeout(() => {
            let direction = -1;
            const scrollAmount = imageList.clientWidth*direction;
            imageList.scrollBy({ left : scrollAmount, behavior : "smooth"}) 
            clearInterval(interval); 
            setInterval(() => {
                const scrollAmount = imageList.clientWidth*direction;
                imageList.scrollBy({ left : scrollAmount, behavior : "smooth"})  
        }, 2000);
         
        },  6000);

