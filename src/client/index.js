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

eraseButton.onclick = () => { setTool(Constants.TOOL.ERASER); };
drawButton.onclick = () => { setTool(Constants.TOOL.PEN) }; 
dragButton.onclick = () => { setTool(Constants.TOOL.DRAG) }; 

Promise.all([
    connect(),

   // downloadAssets(),
  ]).then(() => {
    play();
    //startRendering();

    initState();
    startCapturingDrawings();

  }).catch(console.error);


