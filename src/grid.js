import * as Config from './config';
import Chip from './chip';

export default class Grid {

  constructor(width, height) {

    this.width = width;
    this.height = height;
  }

  draw(ctx, currPlayer, validMoves) {

    //Draw the grid
    const LINE_COUNT = Config.FIELDS + 1;
    const LINE_OFFSET = Config.FIELD_SIZE + Config.BORDER_SIZE;
    const LINE_LENGTH = Config.FIELDS * Config.FIELD_SIZE + (Config.FIELDS + 1) * Config.BORDER_SIZE;
    //Account for the fact that stroke coordinates on canvas are centered at 0.5
    const STROKE_OFFSET = Config.BORDER_SIZE * .5;

    ctx.globalAlpha = 1;
    ctx.lineWidth = Config.BORDER_SIZE;

    //Draw grid
    ctx.strokeStyle = Config.GRID_COLOR;
    ctx.beginPath();
      for(let i = 0; i<LINE_COUNT; i++) {
        ctx.moveTo(STROKE_OFFSET + i * LINE_OFFSET, 0);
        ctx.lineTo(STROKE_OFFSET + i * LINE_OFFSET, LINE_LENGTH);
        ctx.moveTo(0, STROKE_OFFSET + i * LINE_OFFSET);
        ctx.lineTo(LINE_LENGTH, STROKE_OFFSET + i * LINE_OFFSET);
      }
    ctx.stroke();

    //Draw valid move hints
    if(Config.HINT) {
      ctx.fillStyle = (currPlayer == Chip.VALUE.PLAYER_1) ? Config.PLAYER_1_COLOR : Config.PLAYER_2_COLOR;
      validMoves.forEach(move => {
        ctx.globalAlpha = Config.HINT_ALPHA[0] + (Config.HINT_ALPHA[1] - Config.HINT_ALPHA[0]) * move.weightMax;
        ctx.fillRect( move.x * Config.FIELD_SIZE + (move.x + 1) * Config.BORDER_SIZE,
                      move.y * Config.FIELD_SIZE + (move.y + 1) * Config.BORDER_SIZE,
                      Config.FIELD_SIZE, Config.FIELD_SIZE);
      });
      ctx.globalAlpha = 1;
    }
  }
}
