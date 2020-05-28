import interact from 'interactjs'
import paper from 'paper'
import { getCenterOfElem, resetElementToDrawer, isDrawerArea } from './lineUtils'
import { setCurrentLines, getCurrentSlideIndex } from './state'
//import { MakeDNDSimulator } from './dndsim'


var canvas = document.getElementById('game-canvas');
paper.setup(canvas);

function clearCanvas()
{
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    paper.project.clear()
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

// This gets invoked every time a tile gets dragged.
export function processGameUpdate(dragObject){

    var elem = document.getElementById(dragObject.id);

    //console.log(dragObject);

    // elem.style.webkitTransform =
    // elem.style.transform =
    //         'translate(' + dragObject.x + 'px, ' + dragObject.y + 'px)';
    // elem.setAttribute('data-x', dragObject.x);
    // elem.setAttribute('data-y', dragObject.y);

    var x = dragObject.dxRel * document.body.clientWidth;
    var y = dragObject.dyRel * document.body.clientHeight;

    console.log(document.body.clientWidth + " "  + document.body.clientHeight);
    elem.style.webkitTransform =
    elem.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    elem.setAttribute('data-x', x);
    elem.setAttribute('data-y', y);
    

}

// Checks if the dropZone is either the Drawer or the current Garden/Grid
function dropZoneAppliesToCurrentContext(dropZone)
{
    var dropZoneId = dropZone.getAttribute("id");
    var slideIndex = getCurrentSlideIndex();
    if (isNaN(dropZoneId[0]) || dropZoneId.startsWith(slideIndex))
    {
        console.log(dropZoneId);
        return true;
    }

    return false;
}

export function dropItem(drop)
{
    var dragElem = document.getElementById(drop.draggable);
    var dropZoneElem = document.getElementById(drop.dropZone);

    // return to Drawer if the dropZone is the Drawer.
    if (isDrawerArea(dropZoneElem))
    {
        resetElementToDrawer(dragElem);
        return;
    }
    else
    {
        dragElem.classList.remove('inToolbox');
    }

    if(!dropZoneAppliesToCurrentContext(dropZoneElem))
    {
        dragElem.style.visibility = "hidden";
        return;
    }

    dragElem.style.visibility = null;

    var dragRect         = interact.getElementRect(dragElem);
    var dropRect         = interact.getElementRect(dropZoneElem);

    var paddingX = (dropRect.width - dragRect.width) / 2;
    var paddingY = (dropRect.height - dragRect.height) / 2;

    // Drawing a rectangle around the droppable (for debugging purposes only)
    // var rect = new paper.Rectangle(dropRect.left , dropRect.top, dropRect.width, dropRect.height);
    // var path = new paper.Path.Rectangle(rect);
    // path.strokeWidth = 3;
    // path.strokeColor = 'red';

    var prevX = dragElem.getAttribute("data-initx");
    var prevY = dragElem.getAttribute("data-inity");

    var x = dropRect.left - prevX + paddingX;
    var y = dropRect.top - prevY + paddingY;
    // console.log("Init " + prevX + " " + prevY);
    // console.log("Rect " + dropRect.left + " " + dropRect.top);
    // console.log(x+" "+y);

    dragElem.style.webkitTransform =
    dragElem.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    dragElem.setAttribute('data-x', x);
    dragElem.setAttribute('data-y', y);
    dropZoneElem.classList.add('caught--it');
    dropZoneElem.setAttribute("LastCaughtId", drop.draggable);

    // removing the blink effect because Evelyn hates it.
    // var jq = $(dragElem);
    // jq.hide().fadeIn("slow");

    console.log("DROPPED");
}

export function renderLatestMapFromServer(tileMap)
{
    // On game load, we'll render all the tiles with the latest status from the server
    var draggableList = tileMap.draggables;
    var droppableList = tileMap.droppables;
    console.log(droppableList);
    for(var i = 0; i < draggableList.length; i++)
    {
        dropItem({draggable: draggableList[i], dropZone: droppableList[i]});
    }
}

export function dragLeaveUpdate(dragLeaveObject)
{
    var dragElem = document.getElementById(dragLeaveObject.draggable);
    var dropZoneElem = document.getElementById(dragLeaveObject.dropZone);

    dropZoneElem.classList.remove('caught--it');
    //dragElem.classList.remove('drop--me');

    dropZoneElem.setAttribute("LastCaughtId", "");
}

export function renderLinesFromServer(lineList)
{
    clearCanvas();
    var newLines = [];

    for (var i=0; i < lineList.length; i++)
    {
        var line = lineList[i];

        var startpoint = getCenterOfElem(document.getElementById(line.originID));
        var endpoint = getCenterOfElem(document.getElementById(line.targetID));
        var path = new paper.Path.Line(startpoint, endpoint);

        path.closed = true;
    
        path.strokeWidth = 10;
        path.fillColor = 'black';
        path.strokeColor = '#5e211c';
        path.shadowColor = 'red';

        newLines.push({path: path, startpoint: line.originID, endpoint: line.targetID });
    }

    setCurrentLines(newLines);
}

