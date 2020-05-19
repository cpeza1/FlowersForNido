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
        console.log(this.paths);
        this.updatePlayers(socket, this.paths, Constants.MSG_TYPES.UPDATE_LINES, true);
    }

    handleInput(socket, dragObject) {
        this.updatePlayers(socket, dragObject, Constants.MSG_TYPES.GAME_UPDATE, false);
    }

    update() {

    }
}

module.exports = Game;
