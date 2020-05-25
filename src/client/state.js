const Constants = require('../shared/constants');
import interact from 'interactjs'

var currentTool;
var currentLines = [];
var slideIndex = 0;

function storeStartingPositions()
{
    var draggableTiles = document.getElementsByClassName("draggable");

     Array.from(draggableTiles).forEach(function(tile) {
        var rect = interact.getElementRect(tile);
        tile.setAttribute('data-initX', rect.left);
        tile.setAttribute('data-initY', rect.top);
        return tile;
    });

    $('.tile').each(function(i) {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";

        $(this).css('background-color',bgColor);
    });
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

