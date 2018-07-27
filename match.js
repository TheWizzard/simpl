module.exports =  class Match {

    constructor(players, currentPlayersOnField, playerOnStrike, ballsLeft=24, runsToWin=40) {
        this.players = players;
        this.ballsLeft = ballsLeft;
        this.wicketsLeft = players.length - 1;
        this.currentPlayersOnField = currentPlayersOnField;
        this.playerOnStrike = playerOnStrike;
        this.runsToWin = runsToWin;
        this.playerPosition = 1;
        this.playersBatted = [];
    }

    getPlayerIndex() {
        return this.currentPlayersOnField.indexOf(this.playerOnStrike);
    }

    changeStrike() {
        this.playerOnStrike = this.currentPlayersOnField[1 - this.getPlayerIndex()];
    }

    logCommentary(msg, logOver=false) {
        let overNumber = this.ballsLeft % 6 == 0 ? 50 - (this.ballsLeft / 6) : 50 - Math.floor(parseInt(this.ballsLeft / 6)) - 1;
        let ballNumber = 6 - (this.ballsLeft - 1) % 6;
        if(logOver) {
            console.log(`${overNumber}.${ballNumber} : ${msg}`);
        } else {
            console.log(msg);
        }
    }

    logScoreBoard() {
        console.log(`----Match summary----`)
        this.playersBatted.forEach((player) => {
            console.log(`${player.name} - ${player.runsScored}${player.notOut ? "*" : ""} (${player.ballsFaced})`);
        });
    }
    
}