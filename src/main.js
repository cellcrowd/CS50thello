import * as Config from './config';
import Grid from './grid';
import Chip from './chip';
import Logic from './logic';
import Animation from './animation';
import AI from './ai';

class Main {

  constructor() {

    //Basic config validation
    if(Config.FIELDS < 6 || Config.FIELDS % 2 != 0) throw Error('Invalid field count');
    if(Config.FIELD_SIZE % 2 != 0) throw Error('Invalid field size');
    if(Config.CHIP_SIZE > Config.FIELD_SIZE || Config.CHIP_SIZE % 2 != 0) throw Error('Invalid chip size');
    if(Config.AI_MOVE_DELAY[0] > Config.AI_MOVE_DELAY[1]) throw Error('Invalid AI move delay');
    if(Config.HINT_ALPHA[0] > Config.HINT_ALPHA[1]) throw Error('Invalid hint alpha');

    //Calculate offset for centering chip inside field
    const CHIP_OFFSET = (Config.FIELD_SIZE - Config.CHIP_SIZE) * .5;

    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    //Calculate and set canvas size
    this.canvas.width = Config.FIELDS * Config.FIELD_SIZE + (Config.FIELDS + 1) * Config.BORDER_SIZE;
    this.canvas.height = this.canvas.width + Config.BORDER_SIZE * 2 + Config.SCORE_BAR_HEIGHT;

    this.gameloop = this.update.bind(this);
    this.prevTime = 0;
    this.winner = null;
    this.animations = [];
    this.validMoves = [];
    this.score = {animation: null, ratio: .5};
    this.currPlayer = Chip.VALUE.PLAYER_1;

    this.logic = new Logic(this);
    this.ai = new AI();
    this.grid = new Grid(this.canvas.width, this.canvas.height);
    this.chips = new Array(Config.FIELDS).fill(null).map((row, rowIndex) => {
      return new Array(Config.FIELDS).fill(null).map((column, columnIndex) => {
        return new Chip(columnIndex * Config.FIELD_SIZE + (columnIndex + 1) * Config.BORDER_SIZE + CHIP_OFFSET,
                        rowIndex * Config.FIELD_SIZE + (rowIndex + 1) * Config.BORDER_SIZE + CHIP_OFFSET);
      });
    });

    //Reset game state
    this.reset();

    //Setup listeners
    this.canvas.addEventListener('click', this.click.bind(this));
    window.addEventListener('resize', this.resize.bind(this));

    document.body.style.backgroundColor = Config.BACKGROUND_COLOR;
    this.resize();

    //Kick off game loop
    this.gameloop(0);
  }

  reset() {

    //Reset player state
    this.currPlayer = Chip.VALUE.PLAYER_1;

    //Reset winner
    this.winner = null;

    //Reset chips state
    this.chips.forEach(row => row.forEach(chip => chip.value = chip.state = Chip.VALUE.NONE));

    //Set initial game state
    const HALF_GRID_SIZE = Config.FIELDS * .5;

    const CHIP_TL = this.chips[HALF_GRID_SIZE-1][HALF_GRID_SIZE-1];
    CHIP_TL.state = CHIP_TL.value = Chip.VALUE.PLAYER_1;
    CHIP_TL.scaleX = CHIP_TL.scaleY = 1;

    const CHIP_BL = this.chips[HALF_GRID_SIZE-1][HALF_GRID_SIZE];
    CHIP_BL.state = CHIP_BL.value = Chip.VALUE.PLAYER_2;
    CHIP_BL.scaleX = CHIP_BL.scaleY = 1;

    const CHIP_BR = this.chips[HALF_GRID_SIZE][HALF_GRID_SIZE];
    CHIP_BR.state = CHIP_BR.value = Chip.VALUE.PLAYER_1;
    CHIP_BR.scaleX = CHIP_BR.scaleY = 1;

    const CHIP_TR = this.chips[HALF_GRID_SIZE][HALF_GRID_SIZE-1];
    CHIP_TR.state = CHIP_TR.value = Chip.VALUE.PLAYER_2;
    CHIP_TR.scaleX = CHIP_TR.scaleY = 1;

    //Reset score bar
    this.score.ratio = .5;
    this.score.animation = null;

    //Get valid moves
    this.validMoves = this.logic.getValidMoves(this.currPlayer);

    this.checkAIMove();
  }

  click(event) {

    if(event) event.preventDefault();

    //Can't play while AI is playing
    if(this.ai.playing) return;

    //Reset game when it was ended
    if(this.winner) return this.reset();

    //Convert screen coordinates to field coordinates
    const FIELD_SIZE = Config.FIELD_SIZE + Config.BORDER_SIZE;
    //Account for the fact that stroke coordinates on canvas are centered at 0.5
    const FIELD_OFFSET = Config.BORDER_SIZE * .5;
    const FIELD_X = Math.max(0, Math.min(Math.floor((event.offsetX - FIELD_OFFSET) / FIELD_SIZE), Config.FIELDS - 1));
    const FIELD_Y = Math.max(0, Math.min(Math.floor((event.offsetY - FIELD_OFFSET) / FIELD_SIZE), Config.FIELDS - 1));

    //Check and do move
    const DID_MOVE = this.logic.doMove(FIELD_X, FIELD_Y, this.currPlayer);

    //Ignore if move was invalid
    if(!DID_MOVE) return;

    this.onMoved();
  }

  checkAIMove() {

    //Check for AI move
    if((this.currPlayer == Chip.VALUE.PLAYER_1 && Config.PLAYER_1_AI) || (this.currPlayer == Chip.VALUE.PLAYER_2 && Config.PLAYER_2_AI)) {
      this.ai.getMove(this.validMoves, this.currPlayer == Chip.VALUE.PLAYER_1 ? Config.PLAYER_1_AI_TYPE : Config.PLAYER_2_AI_TYPE, Config.AI_MOVE_DELAY, (fieldX, fieldY) => {
        this.logic.doMove(fieldX, fieldY, this.currPlayer);
        this.onMoved();
      });
    }
  }

  onMoved() {

    //Switch player
    this.currPlayer = (this.currPlayer == Chip.VALUE.PLAYER_1) ? Chip.VALUE.PLAYER_2 : Chip.VALUE.PLAYER_1;
    //Get valid moves
    this.validMoves = this.logic.getValidMoves(this.currPlayer);

    const SCORE_1 = this.logic.getScore(Chip.VALUE.PLAYER_1);
    const SCORE_2 = this.logic.getScore(Chip.VALUE.PLAYER_2);

    //Check for game end
    if(!this.validMoves.length) this.winner = (SCORE_1 == SCORE_2) ? Chip.VALUE.NONE : (SCORE_1 > SCORE_2 ? Chip.VALUE.PLAYER_1 : Chip.VALUE.PLAYER_2);
    else this.checkAIMove();

    //Update score bar
    this.score.animation = new Animation(this.score, "ratio", SCORE_1 / (SCORE_1 + SCORE_2), 500, 0, Animation.EASE.INOUT_QUAD);
  }

  update(currTime) {

    const DELTA_TIME = currTime - this.prevTime;
    this.prevTime = currTime;

    //Update AI
    this.ai.update(DELTA_TIME);

    //Update animations
    this.animations.forEach(animation => animation.update(DELTA_TIME));
    //Remove finished animations
    this.animations = this.animations.filter(animation => animation.per < 1);

    //Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Draw grid
    this.grid.draw(this.ctx, this.currPlayer, this.validMoves);

    //Draw chips
    this.chips.forEach(row => row.forEach(chip => chip.draw(this.ctx)));

    //Update score bar
    if(this.score.animation) {
      this.score.animation.update(DELTA_TIME);
      if(this.score.animation.per >= 1) this.score.animation = null;
    }

    //Draw score bar
    const SCORE_1_WIDTH = Math.round((this.canvas.width - Config.BORDER_SIZE * 2) * this.score.ratio);

    this.ctx.lineWidth = Config.SCORE_BAR_HEIGHT;

    this.ctx.strokeStyle = Config.PLAYER_1_COLOR;
    if(this.winner == Chip.VALUE.PLAYER_1 || this.winner == Chip.VALUE.NONE) this.ctx.globalAlpha = (1 + Math.sin(currTime / 100)) * .5;
    this.ctx.beginPath();
      this.ctx.moveTo(Config.BORDER_SIZE, this.canvas.height - Config.SCORE_BAR_HEIGHT + Config.SCORE_BAR_HEIGHT * .5);
      this.ctx.lineTo(Config.BORDER_SIZE + SCORE_1_WIDTH, this.canvas.height - Config.SCORE_BAR_HEIGHT + Config.SCORE_BAR_HEIGHT * .5);
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;

    this.ctx.strokeStyle = Config.PLAYER_2_COLOR;
    if(this.winner == Chip.VALUE.PLAYER_2 || this.winner == Chip.VALUE.NONE) this.ctx.globalAlpha = (1 + Math.sin(currTime / 100)) * .5;
    this.ctx.beginPath();
      this.ctx.moveTo(Config.BORDER_SIZE + SCORE_1_WIDTH, this.canvas.height - Config.SCORE_BAR_HEIGHT + Config.SCORE_BAR_HEIGHT * .5);
      this.ctx.lineTo(this.canvas.width - Config.BORDER_SIZE, this.canvas.height - Config.SCORE_BAR_HEIGHT + Config.SCORE_BAR_HEIGHT * .5);
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;

    requestAnimationFrame(this.gameloop);
  }

  resize() {

    const SCALE_X = (window.innerWidth * Config.SCALE) / this.canvas.width;
    const SCALE_Y = (window.innerHeight * Config.SCALE) / this.canvas.height;

    let scale = Math.min(SCALE_X, SCALE_Y);
    //Limit scale per config
    if(Config.MAX_SCALE > 0) scale = Math.min(Config.MAX_SCALE, scale);

    this.canvas.style.transform = `scale(${scale})`;
  }
}

const MAIN = new Main();
