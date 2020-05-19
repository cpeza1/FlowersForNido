import interact from 'interactjs'
import paper from 'paper'
import { getCenterOfElem } from './lineUtils'

var canvas = document.getElementById('game-canvas');
paper.setup(canvas);
var x = 0;

// process an update from another player
export function processGameUpdate(dragObject){
    //console.log("Movement " + update.x)

    var elem = document.getElementsByClassName("draggable")[0];

    elem.style.webkitTransform =
    elem.style.transform =
            'translate(' + dragObject.x + 'px, ' + dragObject.y + 'px)';
    elem.setAttribute('data-x', dragObject.x);
    elem.setAttribute('data-y', dragObject.y);
    var startPos = null;
   // console.log(dragObject.x + " " + dragObject.y);

    // interact('.droppable').fire({
    //     type:'dragenter',
    //     relatedTarget: document.getElementById('tile1'),
    //     dontSend: true,
    //     target: document.getElementById('0 9'),
    //     draggable: 
    //   interact('.draggable').draggable({
    //     // For the first movement, if we fail to drop on a dropzone, we'll go back to startPos

    //     inertia: false,
    //     autoScroll: true,

    //     // Called the very first time that the object gets dragged.
    //     onstart: function (event) {
    //         var rect = interact.getElementRect(event.target);
    //         console.log("SDASDASDASD");
    //     },

    //     // call this function on every dragmove event
    //     onmove: function (event) {
    //       var target = event.target,
    //           // keep the dragged position in the data-x/data-y attributes
    //           x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    //           y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
           
    //       // translate the element
    //       target.style.webkitTransform =
    //       target.style.transform =
    //         'translate(' + x + 'px, ' + y + 'px)';
  
    //       // update the posiion attributes
    //       target.setAttribute('data-x', x);
    //       target.setAttribute('data-y', y);

    //       target.classList.add('getting--dragged');
    //     },

    //     onend: function (event) {
    //       event.target.classList.remove('getting--dragged')
    //     }
    //   }),
    // });
    // x=1;
}
var duration;
var time_start;
// var startpoint;
// var endpoint;
var difference;
var line;

export function renderLinesFromServer(lineList)
{
    duration = 2000;
    // for(var elem in lineList)
    // var center = getCenterOfElem(elem);
    for (var i=0; i < lineList.length; i++)
    {
        var lineX = lineList[i];

        var startpoint = getCenterOfElem(document.getElementById(lineX.originID));
        var endpoint = getCenterOfElem(document.getElementById(lineX.targetID));
        var path = new paper.Path.Line(startpoint, endpoint);
        // path.onClick = function(e)
        // {
        //     console.log(path);
        //     path.remove();

        // }



        path.closed = true;
    
        path.strokeWidth = 3;
        path.fillColor = 'black';
        path.strokeColor = 'red';

        // difference = new paper.Point(endpoint.x-startpoint.x, endpoint.y-startpoint.y);
        // line = new paper.Path({
	    //     segments: [startpoint, startpoint],
        // 	strokeColor: '#FFFFF',
	    //    // hoverColor: '#b8b367',
        // 	dashArray: [5, 4],
        // 	strokeWidth: 5
        // });

        // console.log(endpoint);
        // console.log(startpoint);

        // time_start = new Date().getTime();

    
        // // Add percent function to view.onFrame handler
        // paper.view.on({
        //     frame: percent
        // });
    }
    
    
    console.log(lineList);
}

var percent = function() {

	// Calculate % completed
	
	var now = new Date().getTime(),
		time_diff = now - time_start;

    var percent_completed = time_diff / duration;

	if ( percent_completed >= 1 ) {
    
        // Remove view.onFrame, percent handler
		paper.view.detach( 'frame', percent );
    
        // Animate that last bit
        animate(1);
    } else {
        // ease out
        // percent_completed = Math.pow(percent_completed, .5);
        // ease in
        // percent_completed = Math.pow(percent_completed, 2);
        animate( percent_completed );
    }
};
    
var animate = function( percent_completed ){
    // Move the end segment of the line every frame
    var p = new paper.Point(startpoint.x, startpoint.y);
    line.segments[1].point = new paper.Point(p.x + ( difference.x * percent_completed ), p.y + ( difference.y * percent_completed ));
}