import * as Config from './config';

export default class AI {

  constructor() {

    this.playing = false;
    this.delay = 0;
    this.move = null;
  }

  getMove(validMoves, AIType, delay, callback) {

    this.playing = true;
    this.delay = delay[0] + Math.random() * (delay[1] - delay[0]);

    const MAX_WEIGHT = Math.max(...validMoves.map(move => move.weightMax), 0);

    //Default AIType: pick first available move
    let move = validMoves[0];

    switch(AIType) {

      //Randomly pick a move
      case 'random':
        move = validMoves[Math.floor(Math.random() * validMoves.length)];
      break;

      //Randomly pick a move, using the capture weights
      case 'weighted_random':
        //Refactor the weights for them to be more extreme
        let total = 0;
        const BOOSTED_WEIGHTS = validMoves.map(m => {
          const BOOSTED_WEIGHT = Math.pow(m.weightTotal, 5);
          total += BOOSTED_WEIGHT;
          return BOOSTED_WEIGHT;
        });

        const RANDOM = Math.random() * total;
        let acc = 0;

        for(let i = 0; i<validMoves.length; i++) {
          acc += BOOSTED_WEIGHTS[i];
          if(RANDOM <= acc) {
            move = validMoves[i];
            break;
          }
        }
      break;

      //Randomly pick between max capture weight moves
      case 'max_weight':
        const MOVES = validMoves.filter(move => move.weightMax == MAX_WEIGHT);
        move = MOVES[Math.floor(Math.random() * MOVES.length)];
      break;
    }

    this.move = {
      x: move.x,
      y: move.y,
      callback
    };
  }

  update(deltaTime) {

    if(this.playing) {

      this.delay -= deltaTime;

      if(this.delay <= 0) {
        this.playing = false;
        this.move.callback(this.move.x, this.move.y);
      }
    }
  }
}
