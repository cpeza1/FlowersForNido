import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate, renderLinesFromServer, dropItem, dragLeaveUpdate, renderLatestMapFromServer } from './render';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.UPDATE_DROP, dropItem);
    socket.on(Constants.MSG_TYPES.UPDATE_LINES, renderLinesFromServer);
    socket.on(Constants.MSG_TYPES.UPDATE_DRAGLEAVE, dragLeaveUpdate);
    socket.on(Constants.MSG_TYPES.UPDATE_MAP, renderLatestMapFromServer);
    // socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server.');
    //   document.getElementById('disconnect-modal').classList.remove('hidden');
    //   document.getElementById('reconnect-button').onclick = () => {
    //     window.location.reload();
    //   };
    // });
  })
);

export const adminConnect = (updateTeamsFunc) => (
  connectedPromise.then(() => {
    socket.on(Constants.MSG_TYPES.UPDATE_TEAMS, updateTeamsFunc)
  })
);

// export const play = username => {
//   socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
// };

export const play = (teamId /*, username */) => {
    console.log("Play");
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, teamId /*, username*/);
  };

export const dragItem = throttle(20, dragObject => {
  socket.emit(Constants.MSG_TYPES.DRAG, dragObject);
});

export const sendLineAddedToServer = (from, target) =>
{
  socket.emit(Constants.MSG_TYPES.ADD_LINE, from, target);
};

export const removeLineFromServer = (from, target) =>
{
  socket.emit(Constants.MSG_TYPES.REMOVE_LINE, from, target);
}

export const sendDropItemToServer = (draggable, dropZone) =>
{
  socket.emit(Constants.MSG_TYPES.DROP, draggable, dropZone);
}

export const sendDragLeaveToserver = (draggable, dropZone) =>
{
  socket.emit(Constants.MSG_TYPES.DRAG_LEAVE, draggable, dropZone);
}

export const getFullMapState = () =>
{
  socket.emit(Constants.MSG_TYPES.GET_MAP);
}

// admin functions
export const getListOfTeams = () =>
{
  console.log("Fetching list of teams");
  socket.emit(Constants.MSG_TYPES.GET_TEAMS);
}