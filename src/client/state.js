const Constants = require('../shared/constants');
import interact from 'interactjs'

var currentTool;
var currentLines = [];
var slideIndex = 0;

function storeStartingPositions()
{
    var draggableTiles = document.getElementsByClassName("draggable");
    var imgIndex = 1;

     Array.from(draggableTiles).forEach(function(tile) {
        var rect = interact.getElementRect(tile);
        tile.setAttribute('data-initX', rect.left);
        tile.setAttribute('data-initY', rect.top);
        
        var url = "../assets/flowers/" + imgIndex +  ".png";
        tile.style.backgroundImage = 'url(' + url +  ')';
        imgIndex++;
        return tile;
    });

    // var j = 1;
    // $('.tile').each(function(i) {
    //     var x = Math.floor(Math.random() * 256);
    //     var y = Math.floor(Math.random() * 256);
    //     var z = Math.floor(Math.random() * 256);
    //     var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    //     // var url =
    //    // $(this).css('background-color',bgColor);
    //    //$(this).css('background-image', )');
    // });


}

export function initState()
{
    storeStartingPositions();
    currentTool = Constants.TOOL.PEN;  
}

export function setTool(newTool)
{
    console.log(newTool);
    currentTool = newTool;

    if (newTool === Constants.TOOL.PEN)
    {
        $(".tile").css('pointer-events', 'none');
    }
    else if (newTool === Constants.TOOL.DRAG)
    {
        $(".tile").css('pointer-events', 'auto');
    }
}

export function getCurrentTool()
{
    return currentTool;
}

export function getCurrentLines()
{
    return currentLines;
}

export function setCurrentLines(lines)
{
    currentLines = lines;
}

export function plusSlides(n) 
{
    slideIndex += n;
}

export function setCurrentSlideIndex(n) 
{
    return slideIndex = n;
}

export function getCurrentSlideIndex() 
{
    return slideIndex;
}

