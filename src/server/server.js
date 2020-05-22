const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
  } else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
  }

// Listen on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

io.on('connection', socket => {
    console.log('Player connected!', socket.id);
    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.DRAG, dragTile);
    socket.on(Constants.MSG_TYPES.DROP, dropTile);
    socket.on(Constants.MSG_TYPES.ADD_LINE, addLine);
    socket.on(Constants.MSG_TYPES.REMOVE_LINE, removeLine);
  });
  
  // Setup the Game
  const game = new Game();
  
  function dragTile(dragObject) {
    game.dragTile(this, dragObject);
  }

  function joinGame() {
    game.addPlayer(this);
  }

  function addLine(fromID, targetID) {
      game.addLine(this, fromID, targetID);
  }

  function removeLine(fromID, targetID) {
    game.removeLine(this, fromID, targetID);
  }

  function dropTile(draggableId, dropZoneId)
  {
    game.dropTile(this, draggableId, dropZoneId);
  }