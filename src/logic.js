import Chip from './chip';
import Animation from './animation';

export default class Logic {

  constructor(main) {

    this.main = main;
  }

  doMove(fieldX, fieldY, value) {

    const CHIP = this.getChip(fieldX, fieldY);
    let valid = false;

    //Invalid move, empty field required
    if(CHIP.value != Chip.VALUE.NONE) return false;

    //Find inbetween opponent chips in each horizontal, vertical and diagonal direction
    Object.keys(Logic.DIRECTION).forEach(prop => {

      const DIRECTION = Logic.DIRECTION[prop];

      let currX = fieldX + DIRECTION.X;
      let currY = fieldY + DIRECTION.Y;
      let nextChip = this.getChip(currX, currY)

      const START_CHIP = nextChip;
      const CAPTURED_CHIPS = [];

      while(nextChip) {

        if(nextChip.value != Chip.VALUE.NONE && nextChip.value != value) CAPTURED_CHIPS.push(nextChip);
        else break;

        currX += DIRECTION.X;
        currY += DIRECTION.Y;
        nextChip = this.getChip(currX, currY);
      }

      //Move is valid only if player chip was found at other end
      if(nextChip && nextChip != START_CHIP && nextChip.value == value) {
        //Turn captured opponent chips to player chips
        CAPTURED_CHIPS.forEach((chip, index) => {
          //Randomly assign turn axis
          const PROP = Math.random() > .5 ? 'scaleX' : 'scaleY';
          this.main.animations.push(new Animation(chip, PROP, 0, 100, index * 100, Animation.EASE.IN_QUAD, () => {
            chip.state = value;
            this.main.animations.push(new Animation(chip, PROP, 1, 100, 0, Animation.EASE.OUT_QUAD));
          }));
          chip.value = value;
        });
        //Flag this move as valid
        valid = true;
      }
    });

    //Set player chip on current field if move is valid
    if(valid) {
      CHIP.state = CHIP.value = value;
      this.main.animations.push(new Animation(CHIP, 'scaleX', 1, 100, 0, Animation.EASE.LINEAR));
      this.main.animations.push(new Animation(CHIP, 'scaleY', 1, 100, 0, Animation.EASE.LINEAR));
    }

    return valid;
  }

  getValidMoves(value) {

    const VALID_MOVES = [];

    this.main.chips.forEach((row, y) => {
      row.forEach((chip, x) => {

        if(chip.value == Chip.VALUE.NONE) {

          //Find inbetween opponent chips in each horizontal, vertical and diagonal direction
          Object.keys(Logic.DIRECTION).forEach(prop => {

            const DIRECTION = Logic.DIRECTION[prop];

            let currX = x + DIRECTION.X;
            let currY = y + DIRECTION.Y;
            let nextChip = this.getChip(currX, currY)

            const START_CHIP = nextChip;
            const CAPTURED_CHIPS = [];

            while(nextChip) {

              if(nextChip.value != Chip.VALUE.NONE && nextChip.value != value) CAPTURED_CHIPS.push(nextChip);
              else break;

              currX += DIRECTION.X;
              currY += DIRECTION.Y;
              nextChip = this.getChip(currX, currY);
            }

            //Move is valid only if player chip was found at other end
            if(nextChip && nextChip != START_CHIP && nextChip.value == value) {
              //Check if this move already exists
              const MOVE = VALID_MOVES.find(move => move[0] == x && move[1] == y);
              if(MOVE) MOVE[2] += CAPTURED_CHIPS.length;
              else VALID_MOVES.push({x, y, captures: CAPTURED_CHIPS.length});
            }
          });
        }
      });
    });

    //Calculate capture weights
    const CAPTURED_CHIPS_MAX = Math.max(...VALID_MOVES.map(move => move.captures), 0);
    const CAPTURED_CHIPS_TOTAL = VALID_MOVES.reduce((total, move) => total += move.captures, 0);

    VALID_MOVES.forEach(move => {
      move.weightMax = move.captures / CAPTURED_CHIPS_MAX;
      move.weightTotal = move.captures / CAPTURED_CHIPS_TOTAL;
    });

    return VALID_MOVES;
  }

  getChip(fieldX, fieldY) {

    return this.main.chips[fieldY] && this.main.chips[fieldY][fieldX];
  }

  get player1Score() {

    let score = 0;

    this.main.chips.forEach(row => row.forEach(chip => {
      if(chip.value == Chip.VALUE.PLAYER_1) score++;
    }));

    return score;
  }

  get player2Score() {

    let score = 0;

    this.main.chips.forEach(row => row.forEach(chip => {
      if(chip.value == Chip.VALUE.PLAYER_2) score++;
    }));

    return score;
  }
}

Logic.DIRECTION = {
  LEFT: {X: -1, Y: 0},
  TOP_LEFT: {X: -1, Y: -1},
  TOP: {X: 0, Y: -1},
  TOP_RIGHT: {X: 1, Y: -1},
  RIGHT: {X: 1, Y: 0},
  BOTTOM_RIGHT: {X: 1, Y: 1},
  BOTTOM: {X: 0, Y: 1},
  BOTTOM_LEFT: {X: -1, Y: 1}
}
