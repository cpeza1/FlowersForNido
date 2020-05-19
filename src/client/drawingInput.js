import paper from 'paper'
import { debounce } from 'throttle-debounce';
import { getCenterOfElem, getElementFromPoint } from './lineUtils'
import { sendLineAddedToServer } from './networking'
import { getCurrentTool } from './state'

const Constants = require('../shared/constants');

var canvas = document.getElementById('game-canvas');
var line;
var current;

var originElemId;
var targetElemId;


paper.setup(canvas);

function offset(element){
    var body = document.body,
        win = document.defaultView,
        docElem = document.documentElement,
        box = document.createElement('div');
    box.style.paddingLeft = box.style.width = "1px";
    body.appendChild(box);
    var isBoxModel = box.offsetWidth == 2;
    body.removeChild(box);
    box = element.getBoundingClientRect();
    var clientTop  = docElem.clientTop  || body.clientTop  || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
        scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
    return {
        top : box.top  + scrollTop  - clientTop,
        left: box.left + scrollLeft - clientLeft};
}

function Line(mouseDownPoint)
{
    this.start = mouseDownPoint;
    this.headLength = 20;
    this.tailLength = 9;
    this.headAngle = 35;
    this.tailAngle = 110
}

Line.prototype.draw = function (point) {
    var end = point;

    this.path = new paper.Path.Line(this.start, end);
    this.path.closed = true;
    
    this.path.strokeWidth = 3;
    this.path.strokColor = 'black';
    this.path.fillColor = 'black';
    this.path.strokeColor = 'red';

    return this.path;
}

function onMouseDown(e) {
    var tool = getCurrentTool();
    
    if(tool === Constants.TOOL.PEN){
        var elem = getElementFromPoint(e.point, "gridElement");
        if (elem) {
            var center = getCenterOfElem(elem);
            line = new Line(center);
            originElemId = elem.id;

            var pos = elem.getBoundingClientRect();
    
            var sq = new Square();
            sq.draw(pos,elem);
    
        }

    }
}

function onMouseDrag (e) {

    var tool = getCurrentTool();

    if(tool === Constants.TOOL.PEN){
        if (current) current.remove();

        if (line){
            current = line.draw(e.point);
        }

        console.log("PEN");
    }
    else if (tool === Constants.TOOL.ERASER){
        console.log("ERSER");
    }
}

function onMouseUp (e) {
    var elem = getElementFromPoint(e.point, "gridElement");
    if (current) current.remove();

    if (elem) {
        var end = getCenterOfElem(elem);
        current = line.draw(end);

        targetElemId = elem.id;

        sendLineAddedToServer(originElemId, targetElemId);
    }
}

export function startCapturingDrawings()
{
    paper.view.onMouseDown = onMouseDown;
    paper.view.onMouseDrag = onMouseDrag;
    paper.view.onMouseUp   = onMouseUp;
}

export function stopCapturingDrawings(lineList)
{
    console.log(lineList);
}


function Square()
{

}

Square.prototype.draw = function (position,elem) {

    this.rect = new paper.Rectangle(position.left + window.scrollX , position.top, position.width, position.height);

    this.path = new paper.Path.Rectangle(this.rect);
    this.path.strokeWidth = 3;
    this.path.strokColor = 'black';
    //this.path.fillColor = 'black';
    this.path.strokeColor = 'red';

    //console.log(path);

    return this.path;
}