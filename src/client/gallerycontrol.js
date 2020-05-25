import { getCurrentSlideIndex, setCurrentSlideIndex } from './state'
import { getFullMapState } from './networking'
require("jquery-ui/ui/effects/effect-slide");

export function showSlides(n) 
{
    var i;
    var slides = document.getElementsByClassName("gridView");
    var slideIndex = getCurrentSlideIndex();

    if (n > slides.length-1) 
    {
        slideIndex = 0;
        setCurrentSlideIndex(slideIndex);
    }

    if (n < 1) 
    {
        slideIndex = slides.length-1;
        setCurrentSlideIndex(slideIndex);
    }
   
    for (i = 0; i < slides.length; i++) 
    {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";

    var jqueryElem = $(slides[slideIndex]);
    // jqueryElem.hide().effect("highlight", {}, 3000);
    // jqueryElem.hide().fadeIn("slow");
    jqueryElem.effect("slide", null, 500, getFullMapState);
    //getFullMapState();
}
