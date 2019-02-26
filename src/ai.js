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
        const RANDOM = Math.random();
        let acc = 0;
        validMoves.some(m => {
          acc += m.weightTotal;
          if(RANDOM <= acc) {
            move = m;
            return true;
          }else return false;
        });
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
