import * as Config from './config';

export default class Chip {

  constructor(x, y) {

    this.x = x;
    this.y = y;
    this.scaleX = 0;
    this.scaleY = 0;
    //Used for rendering
    this.state = Chip.VALUE.NONE;
    //Used for logic
    this.value = Chip.VALUE.NONE;
  }

  draw(ctx) {

    if(this.state == Chip.VALUE.NONE) return;

    const GRAPHICS = Chip.getGraphics(this.state);

    //Offset drawing position to keep chip centered
    const OFFSET_X = GRAPHICS.width * (1 - this.scaleX) * .5;
    const OFFSET_Y = GRAPHICS.height * (1 - this.scaleY) * .5;

    ctx.drawImage(GRAPHICS, this.x + OFFSET_X, this.y + OFFSET_Y, GRAPHICS.width * this.scaleX, GRAPHICS.height * this.scaleY);
  }

  static getGraphics(state) {

    //One-off creation of the graphics
    if(!Chip.BUFFER[state]) {

      const HALF_CHIP_SIZE = Config.CHIP_SIZE * .5;

      let buffer = document.createElement('canvas');
      buffer.width = buffer.height = Config.CHIP_SIZE;

      let ctx = buffer.getContext('2d');
      ctx.fillStyle = (state == Chip.VALUE.PLAYER_1) ? Config.PLAYER_1_COLOR : Config.PLAYER_2_COLOR;
      ctx.beginPath();
      ctx.arc(HALF_CHIP_SIZE, HALF_CHIP_SIZE, HALF_CHIP_SIZE, 0, 2 * Math.PI);
      ctx.fill();

      Chip.BUFFER[state] = buffer;
    }

    return Chip.BUFFER[state];
  }
}

Chip.BUFFER = {};
Chip.VALUE = {
  NONE: 0,
  PLAYER_1: 1,
  PLAYER_2: 2
};
