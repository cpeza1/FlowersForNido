import interact from 'interactjs'
import paper from 'paper'
import { getCenterOfElem } from './lineUtils'
import { setCurrentLines } from './state'
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

// process an update from another player
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

    elem.style.webkitTransform =
    elem.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    elem.setAttribute('data-x', x);
    elem.setAttribute('data-y', y);
    

   // console.log(dragObject.x + " " + dragObject.y);

    console.log("MOVED");
}

var prevX;
var prevY;
var init = 0;
export function dropItem(drop)
{
    var dragElem = document.getElementById(drop.draggable);
    var dropZoneElem = document.getElementById(drop.dropZone);

    // console.log(dropZoneElem.getAttribute("data-y"));

    var dragRect         = interact.getElementRect(dragElem);
    var dropRect         = interact.getElementRect(dropZoneElem);
    // var dropCenter       = {
    //     x: dropRect.left + dropRect.width  / 2,
    //     y: dropRect.top  + dropRect.height / 2
    // };

    var paddingX = (dropRect.width - dragRect.width) / 2;
    var paddingY = (dropRect.height - dragRect.height) / 2;

    var rect = new paper.Rectangle(dropRect.left , dropRect.top, dropRect.width, dropRect.height);

    var path = new paper.Path.Rectangle(rect);
    path.strokeWidth = 3;
    path.strokeColor = 'red';

    prevX = dragElem.getAttribute("data-initx");
    prevY = dragElem.getAttribute("data-inity");

        // REMEMBER: we need to store the original position and calculate bsed on that

    var x = dropRect.left - prevX + paddingX;
    var y = dropRect.top - prevY + paddingY;
    
    // console.log(x+" "+y);

    dragElem.style.webkitTransform =
    dragElem.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    dragElem.setAttribute('data-x', x);
    dragElem.setAttribute('data-y', y);
    dropZoneElem.classList.add('caught--it');
    console.log("DROPPED");
}

export function renderLatestMapFromServer(tileMap)
{
    // On game load, we'll render all the tiles with the latest status from the server
    var draggableList = tileMap.draggables;
    var droppableList = tileMap.droppables;
    
    for(var i = 0; i < draggableList.length; i++)
    {
        dropItem({draggable: draggableList[i], dropZone: droppableList[i]});
    }
}

export function dragLeaveUpdate(dragLeaveObject)
{
    var dragElem = document.getElementById(dragLeaveObject.draggable);
    var dropZoneElem = document.getElementById(dragLeaveObject.dropZone);

    dropZoneElem.classList.remove('can--catch', 'caught--it');
    dragElem.classList.remove('drop--me');
}

export function renderLinesFromServer(lineList)
{
    clearCanvas();
    console.log("LINES");
    var newLines = [];

    for (var i=0; i < lineList.length; i++)
    {
        var line = lineList[i];

        var startpoint = getCenterOfElem(document.getElementById(line.originID));
        var endpoint = getCenterOfElem(document.getElementById(line.targetID));
        var path = new paper.Path.Line(startpoint, endpoint);

        path.closed = true;
    
        path.strokeWidth = 3;
        path.fillColor = 'black';
        path.strokeColor = 'red';

        newLines.push({path: path, startpoint: line.originID, endpoint: line.targetID });
    }

    setCurrentLines(newLines);
}


