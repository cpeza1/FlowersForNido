const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');
const Rooms = require('./rooms')

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
var adminSockets = {};

io.on('connection', socket => {
    console.log('Player connected!', socket.id);
    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.DRAG, dragTile);
    socket.on(Constants.MSG_TYPES.DROP, dropTile);
    socket.on(Constants.MSG_TYPES.ADD_LINE, addLine);
    socket.on(Constants.MSG_TYPES.REMOVE_LINE, removeLine);
    socket.on(Constants.MSG_TYPES.DRAG_LEAVE, dragLeave);
    socket.on(Constants.MSG_TYPES.GET_MAP, getMap);
    socket.on(Constants.MSG_TYPES.GET_TEAMS, getTeams);
    socket.on('disconnect', onDisconnect);
  });
  
  // Setup the Game
  //const game = new Game();
  const rooms = new Rooms();

  function dragTile(dragObject) {
    var game = rooms.GetRoomBySocket(this);
    game ? game.dragTile(this, dragObject) : {};
  }

  function joinGame(teamID /*, userName*/) {
    if(teamID==null)
    {
      console.log("team ID is null");
      return;
    }

    var game = rooms.GetRoomByTeamId(this, teamID);
    game ? game.addPlayer(this) : {};
  }

  function addLine(fromID, targetID) {
    var game = rooms.GetRoomBySocket(this);
    game ? game.addLine(this, fromID, targetID) : {};
  }

  function removeLine(fromID, targetID) {
    var game = rooms.GetRoomBySocket(this);
    game ? game.removeLine(this, fromID, targetID) : {};
  }

  function dropTile(draggableId, dropZoneId)
  {
    var game = rooms.GetRoomBySocket(this);
    game ? game.dropTile(this, draggableId, dropZoneId) : {};
    
  }

  function dragLeave(draggableId, dropZoneId)
  {
    var game = rooms.GetRoomBySocket(this);
    game ? game.dragLeave(this, draggableId, dropZoneId) : {};
  }

  function getMap()
  {
    var game = rooms.GetRoomBySocket(this);
    game ? game.getMap(this) : {};
  }

  function getTeams()
  {
    console.log("Getting teams");
    adminSockets[this.id] = this;

    var roomList = rooms.GetRooms();

    console.log("The teams are:" + roomList);
    this.emit(Constants.MSG_TYPES.UPDATE_TEAMS, roomList);
  }

  function onDisconnect()
  {
    if(this.id in adminSockets)
    {
      console.log("Admin disconnected");
      delete adminSockets[this.id];
      return;
    }

    var game = rooms.GetRoomBySocket(this);
    game ? game.removePlayer(this) : {};
  }