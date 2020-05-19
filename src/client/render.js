import interact from 'interactjs'
import paper from 'paper'
import { getCenterOfElem } from './lineUtils'
import { setCurrentLines } from './state'

var canvas = document.getElementById('game-canvas');
paper.setup(canvas);

function clearCanvas()
{
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    paper.project.clear()
}

// process an update from another player
export function processGameUpdate(dragObject){

    var elem = document.getElementsByClassName("draggable")[0];

    elem.style.webkitTransform =
    elem.style.transform =
            'translate(' + dragObject.x + 'px, ' + dragObject.y + 'px)';
    elem.setAttribute('data-x', dragObject.x);
    elem.setAttribute('data-y', dragObject.y);

   // console.log(dragObject.x + " " + dragObject.y);

    // interact('.droppable').fire({
    //     type:'dragenter',
    //     relatedTarget: document.getElementById('tile1'),
    //     dontSend: true,
    //     target: document.getElementById('0 9'),
    //     draggable: 
    //   interact('.draggable').draggable({
    //     // For the first movement, if we fail to drop on a dropzone, we'll go back to startPos

    //     onend: function (event) {
    //       event.target.classList.remove('getting--dragged')
    //     }
    //   }),
    // });
    // x=1;
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
    
        path.strokeWidth = 3;
        path.fillColor = 'black';
        path.strokeColor = 'red';

        newLines.push({path: path, startpoint: line.originID, endpoint: line.targetID });
    }

    setCurrentLines(newLines);
}
