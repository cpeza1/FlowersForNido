const ConnectingPath = require('./connectingpath');
const Constants = require('../shared/constants');

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.paths = [];
        this.droppedTiles = new Map();
        setInterval(this.update.bind(this), 1000 / 60);
    }

    updatePlayers(socket, objectToSend, messageType, sendToAll)
    {
        Object.keys(this.sockets).forEach(playerID => {
            const currSocket = this.sockets[playerID];
            
            if (sendToAll || socket != currSocket)
            {
                currSocket.emit(messageType, objectToSend);
            }
        });
    }

    updateSinglePlayer(socket, objectToSend, messageType)
    {
        socket.emit(messageType, objectToSend);
    }

    getMap(socket)
    {
        var draggables = [...this.droppedTiles.keys()];
        var droppables = [...this.droppedTiles.values()];
        this.updateSinglePlayer(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES);
        this.updateSinglePlayer(socket, {draggables: draggables, droppables: droppables}, Constants.MSG_TYPES.UPDATE_MAP);
    }    

    addPlayer(socket) {
        this.sockets[socket.id] = socket;

        // var draggables = [...this.droppedTiles.keys()];
        // var droppables = [...this.droppedTiles.values()];
        // this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
        // this.updatePlayers(socket, {draggables: draggables, droppables: droppables}, Constants.MSG_TYPES.UPDATE_MAP, true);
    }

    removePlayer(socket) {
        delete this.sockets[socket.id];
        console.log('Player disconnected!', socket.id);
      }

    addLine(socket, originID, targetID)
    {
        this.paths.push(new ConnectingPath(originID, targetID));
        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
    }

    removeLine(socket, originID, targetID)
    {
        var i = this.paths.length;
        while(i--)
        {
            var path = this.paths[i];
            if (path.originID == originID && path.targetID == targetID)
            {
                this.paths.splice(i,1);
            }
        }
        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
    }

    dragTile(socket, dragObject) {
        this.updatePlayers(socket, dragObject, Constants.MSG_TYPES.GAME_UPDATE, false);
    }

    dropTile(socket, draggableId, dropZoneId){
        var dropObject = {
            draggable: draggableId,
            dropZone: dropZoneId,
        }

        // Populate the map that the server uses to keep track of the state of the moved tiles.
        this.droppedTiles.set(draggableId, dropZoneId);

        // Let other players know that we dropped a tile.
        this.updatePlayers(socket, dropObject, Constants.MSG_TYPES.UPDATE_DROP, false);
    }
    
    dragLeave(socket, draggableId, dropZoneId){
        var dropObject = {
            draggable: draggableId,
            dropZone: dropZoneId,
        }

        var i = this.paths.length
        while(i--)
        {
            var path = this.paths[i];
            if (path.originID == dropZoneId || path.targetID == dropZoneId)
            {
                this.paths.splice(i,1);
            }
        }

        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
        this.updatePlayers(socket, dropObject, Constants.MSG_TYPES.UPDATE_DRAGLEAVE, false);
    }

    update() {

    }
}

module.exports = Game;
