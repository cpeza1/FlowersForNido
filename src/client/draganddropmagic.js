import interact from 'interactjs'
import { dragItem, sendDropItemToServer } from './networking';


export function snapElemToTarget()
{

}

(function() {

    function init() {
      var startPos = null;
  
      interact('.draggable').draggable({
        // For the first movement, if we fail to drop on a dropzone, we'll go back to startPos
        snap: {
          targets: [startPos],
          range: Infinity,
          relativePoints: [ { x: 0.5, y: 0.5 } ],
          endOnly: true
        },

        inertia: false,
        autoScroll: true,

        // Called the very first time that the object gets dragged.
        onstart: function (event) {
            var rect = interact.getElementRect(event.target);
  

        },

        // call this function on every dragmove event
        onmove: function (event) {
          var target = event.target,
              // keep the dragged position in the data-x/data-y attributes
              x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
              y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
          // translate the element
          target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
  
          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
            // Tell everyone else that we moved!
          
          var dxRel = x / document.body.clientWidth;
          var dyRel = y / document.body.clientHeight;
          // console.log(event.dy + " " + dyRel);

          var draggableId = target.getAttribute("id");
          dragItem({id: draggableId, x, y, dxRel, dyRel});


          target.classList.add('getting--dragged');
        },

        onend: function (event) {
          event.target.classList.remove('getting--dragged')
        }
      });
  
      interact('.droppable').dropzone({
        accept: '.draggable',
        overlap: .5,


        // // The item is getting dragged
        // ondropactivate: function (event) {
        //     console.log("ACTIVATE");
        //   event.target.classList.add('can--drop');
        // },

        // The item is in the dropzone
        ondragenter: function (event) {
          console.log("ENTER");
          var draggableElement = event.relatedTarget,
              dropzoneElement  = event.target,
              dropRect         = interact.getElementRect(dropzoneElement),
              dropCenter       = {
                x: dropRect.left + dropRect.width  / 2,
                y: dropRect.top  + dropRect.height / 2
              };
        console.log("DropCenter ");

          event.draggable.draggable({
            snap: {
              targets: [dropCenter]
            }
          });
         // console.log("dragCenter");
  
          // feedback the possibility of a drop
          dropzoneElement.classList.add('can--catch');
          draggableElement.classList.add('drop--me');
        },

    //     // The item was moved out of the dropzone
    //     ondragleave: function (event) {
    //       // remove the drop feedback style
    //       event.target.classList.remove('can--catch', 'caught--it');
    //       event.relatedTarget.classList.remove('drop--me');
    //     },
        ondrop: function (event) {
          console.log("DROP");
          sendDropItemToServer(event.relatedTarget.getAttribute("id"), event.target.getAttribute("id"));
          //dropItem()
    //      // console.log("Index of dropped node: " + (event.target));
    //     //  console.log("Index of dragged node: " + getNodeIndex(event.relatedTarget.parentNode));
    //       //event.relatedTarget.textContent = 'Dropped';
    //       console.log("Dropped!");
    //   //    console.log("related target: " + event.relatedTarget.parentNode);
    //  //     console.log(event.draggable);
    //       event.target.classList.add('caught--it');
        },


    //     ondropdeactivate: function (event) {
    //       // remove active dropzone feedback
    //       event.target.classList.remove('can--drop');
    //       event.target.classList.remove('can--catch');
    //     }
      });
    }
  
    function getNodeIndex(node) {
      var index = 0;
      while ( (node = node.previousSibling) ) {
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
          index++;
        }
      }
      return index;
    }
  
    window.onload = function() {
      init();
    }
  
  })();
  