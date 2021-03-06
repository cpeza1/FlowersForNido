import interact from 'interactjs'
import paper from 'paper'

export function getElementFromPoint(point, name)
{
    // var canvas=document.getElementById('game-canvas');
    // var BB=canvas.getBoundingClientRect();
    // var canvasOffsetX=BB.left;
    // var canvasOffsetY=BB.top;      

    var offsetX = window.scrollX ;
    var offsetY = window.scrollY ;

    var elems = document.elementsFromPoint(point.x - offsetX, point.y - offsetY);

    for (var i = 0; i < elems.length; i++)
    {
        var className = elems[i].className;
        if (className.includes(name))
        {
            return elems[i];
        }
    }
    return null;
}

export function getCenterOfElem(elem)
{
    var rect = interact.getElementRect(elem);
   
    var p = new paper.Point(rect.left  + rect.width  / 2 , rect.top  + rect.height / 2 );

    return p;
}

export function isDrawerArea(dropZone)
{
    return dropZone.getAttribute("id") === "drawerArea";    
}


export function resetElementToDrawer(elem)
{
    elem.classList.add('inToolbox');
    elem.style.removeProperty('transform');
    elem.style.removeProperty('webkitTransform');
    elem.removeAttribute('data-x');
    elem.removeAttribute('data-y');
}