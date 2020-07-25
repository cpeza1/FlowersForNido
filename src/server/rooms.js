const Game = require('./game');

// let passwords = [
//                 '0',
//                 '1',
//                 '2',
//                 '3',
//                 '4',
//                 '5',
//                 '6',
//                 '7',
//                 '8']

// let roomTotal = 9;

// TeamId -> Room
// UserName-> Team
// Socket ->UserName

class Rooms {

    constructor() {
        this.roomList = new Map();
        // this.users = new Map();
        this.socketTeamMap = new Map();
    }

    // IsPasswordValid(password)
    // {
    //     return passwords.includes(password);
    // }

    // GetRoomIndex(password)
    // {
    //     return passwords.indexOf(password);
    // }

    // RegisterUsername(socket, username, password)
    // {
    //     this.users.set(socket.id, username);
    //     this.userRoomMap.set(socket.id, this.GetRoomIndex(password));
    // }

    GetRoomByTeamId(socket, teamId)
    {
        this.socketTeamMap.set(socket.id, teamId);

        if (this.roomList.has(teamId))
        {
            // If a room already exists for this team, return it.
            return this.roomList.get(teamId);
        }

        // Otherwise create it.
        console.log("Creating new Room");
        this.roomList.set(teamId, new Game());
        
        return this.roomList.get(teamId);
    }

    GetRoomBySocket(socket)
    {
        var teamId = this.socketTeamMap.get(socket.id);

        if(teamId == null)
        {
            console.log("TeamID is null");
            return;
        }

        return this.GetRoomByTeamId(socket, teamId);
    }

    GetRooms()
    {
        var teamList = [];
        
        for (const [teamName, game] of this.roomList.entries()) {
            teamList.push([teamName, game.numberOfPlayers()]);
          } 
        return teamList;
    }
}

module.exports = Rooms;