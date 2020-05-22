const ConnectingPath = require('./connectingpath');
const Constants = require('../shared/constants');

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.paths = [];
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

    addPlayer(socket) {
        this.sockets[socket.id] = socket;
        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
    }

    addLine(socket, originID, targetID)
    {
        this.paths.push(new ConnectingPath(originID, targetID));
        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
    }

    removeLine(socket, originID, targetID)
    {
        for (var i = 0; i < this.paths.length; i++)
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
