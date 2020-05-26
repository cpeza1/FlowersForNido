import _ from 'lodash';
import "./styles.css";

import { connect, play } from './networking';
//import { interact } from 'interactjs';
import interact from 'interactjs'

import GridContainer from './gridcontainer'
import Grid from './grid'
import ObjectDrawer from './ObjectDrawer'
import * as dnd from './draganddropmagic';
import * as paper from 'paper'
import { startCapturingDrawings, stopCapturingInput } from './drawingInput';

import eraser from '../../public/assets/eraser.png'
import pencil from '../../public/assets/pencil.png'
import drag from '../../public/assets/drag.png'

import { setTool, initState, plusSlides, getCurrentSlideIndex } from './state'
import { showSlides } from './gallerycontrol'



const Constants = require('../shared/constants');
const eraseButton = document.getElementById('eraseButton');
const drawButton = document.getElementById('drawButton');
const dragButton = document.getElementById('dragButton');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

eraseButton.onclick = () => { setTool(Constants.TOOL.ERASER); document.documentElement.style.cursor = 'url(' + eraser +'), default';};
drawButton.onclick = () => { setTool(Constants.TOOL.PEN); document.documentElement.style.cursor = 'url(' + pencil +'), default'; }; 
dragButton.onclick = () => { setTool(Constants.TOOL.DRAG) }; 
// prevButton.onclick = () => { plusSlides(-1); showSlides(getCurrentSlideIndex()); };
// nextButton.onclick = () => { plusSlides(1); showSlides(getCurrentSlideIndex()); };

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../../public/assets', false, /\.(png|jpe?g|svg)$/));
console.log(images);


Promise.all([
    connect(),

   // downloadAssets(),
  ]).then(() => {
    play();
    //startRendering();

    showSlides(1);
    initState();
    startCapturingDrawings();

  }).catch(console.error);

