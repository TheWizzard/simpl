module.exports =  class Player {

    constructor({name, probabilities}){
        this.name = name;
        this.probabilities = probabilities;
        this.runsScored = 0;
        this.ballsFaced = 0;
        this.notOut = true;
    }
    getBallOutCome() {
        let weighted_scores = this.getWeightedScores();
        let rand = Math.floor(Math.random() * 100);
        return weighted_scores[rand];
    }

    getWeightedScores() {
        let weighted_scores = [];
        this.probabilities.forEach((p, index) => {
            for(let i=0;i<p;i++){
                weighted_scores.push(index);
            }
        })
        return weighted_scores;
    }
}