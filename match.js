module.exports =  class Match {

    constructor(players, currentPlayersOnField, playerOnStrike, ballsLeft=24, runsToWin=40){
        this.players = players;
        this.ballsLeft = ballsLeft;
        this.wicketsLeft = players.length;
        this.currentPlayersOnField = currentPlayersOnField;
        this.playerOnStrike = playerOnStrike;
        this.runsToWin = runsToWin;
        this.playerPosition = 1;
    }

    getPlayerIndex(){
        return this.currentPlayersOnField.indexOf(this.playerOnStrike);
    }

    changeStrike() {
        this.playerOnStrike = this.currentPlayersOnField[1 - this.getPlayerIndex()];
    }
    
}