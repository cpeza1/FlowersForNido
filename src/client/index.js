import _ from 'lodash';
import "./styles.css";

import { connect, play } from './networking';
//import { interact } from 'interactjs';
import interact from 'interactjs'

import Grid from './grid'
import ObjectDrawer from './ObjectDrawer'
import * as dnd from './draganddropmagic';
import * as paper from 'paper'
import { startCapturingDrawings, stopCapturingInput } from './drawingInput';

import eraser from '../../public/assets/eraser.png'
import pencil from '../../public/assets/pencil.png'
import drag from '../../public/assets/drag.png'

import { setTool, initState } from './state'

const Constants = require('../shared/constants');
const eraseButton = document.getElementById('eraseButton');
const drawButton = document.getElementById('drawButton');
const dragButton = document.getElementById('dragButton');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

eraseButton.onclick = () => { setTool(Constants.TOOL.ERASER); document.documentElement.style.cursor = 'url(' + eraser +'), default';};
drawButton.onclick = () => { setTool(Constants.TOOL.PEN); document.documentElement.style.cursor = 'url(' + pencil +'), default'; }; 
dragButton.onclick = () => { setTool(Constants.TOOL.DRAG) }; 

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("viewX");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
}


prevButton.onclick = () => 
{ 
  plusSlides(-1);
}
nextButton.onclick = () => 
{ 
  plusSlides(1);
}

Promise.all([
    connect(),

   // downloadAssets(),
  ]).then(() => {
    play();
    //startRendering();

    initState();
    startCapturingDrawings();

  }).catch(console.error);

