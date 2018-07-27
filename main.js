(() => {
    const Player = require('./player.js');
    const Match = require('./match.js');

    const players = [{
            name: 'Kirat Boli',
            probabilities: [5, 30, 25, 10, 15, 1, 9, 5]
        },
        {
            name: 'N.S.Nodhi',
            probabilities: [10, 40, 20, 5, 10, 1, 4, 10]
        },
        {
            name: 'R Rumrah',
            probabilities: [20, 30, 15, 5, 5, 1, 4, 20]
        },
        {
            name: 'Shashi Henra',
            probabilities: [30, 25, 5, 0, 5, 1, 4, 30]
        }
    ]

    let currentPlayersOnField = [new Player(players[0]), new Player(players[1])];
    let playerOnStrike = currentPlayersOnField[0];
    let playerPosition = 1;
    let ballsLeft = 24;
    let runsToWin = 40;

    let match = new Match(players, currentPlayersOnField, playerOnStrike, ballsLeft, runsToWin);

    // let the match begin
    while (match.ballsLeft > 0 && match.runsToWin > 0) {

        //Log Overs Remaining
        if (match.ballsLeft % 6 == 0) {
            match.logCommentary(`${match.ballsLeft/6} Overs Remaining, ${match.runsToWin} runs to win`)
        }
        //Get current Ball Outcome
        let ballOutcome = match.playerOnStrike.getBallOutCome();

        // If player is out
        if (ballOutcome == 7) {
            match.wicketsLeft--;
            ++match.playerPosition;
            match.logCommentary(`${match.playerOnStrike.name} was bowled out.`, true)

            //all wickets gone
            if (match.wicketsLeft == 0) {
                match.logCommentary(`Bengaluru is all out.`)
                break;
            } else {
                // Bring the new player to strike
                let playerIndex = match.getPlayerIndex();
                match.currentPlayersOnField[playerIndex] = new Player(players[match.playerPosition]);
                match.playerOnStrike = match.currentPlayersOnField[playerIndex];
                match.logCommentary(`${match.playerOnStrike.name} has come to bat`)
            }
        } else {
            match.runsToWin -= ballOutcome;
           match.logCommentary(`${match.playerOnStrike.name} scores ${ballOutcome} runs`, true);

            // Change strike on odd runs
            if (ballOutcome % 2 != 0) {
                match.changeStrike();
            }
        }


        match.ballsLeft--;

        // Change strike after last ball of the over
        if (match.ballsLeft % 6 == 0) {
            match.changeStrike();
        }
    }

    if (match.runsToWin > 0) {
        match.logCommentary(`Bengaluru has lost the match by ${match.runsToWin} runs`);
    } else {
        match.logCommentary(`Bengaluru has won the match by ${match.wicketsLeft} wickets with ${match.ballsLeft} balls remaining`);
    }

})();