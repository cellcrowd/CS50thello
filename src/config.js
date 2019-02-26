//Enable AI for player 1, boolean
export const PLAYER_1_AI = false;
//AI type from player 1, 'first', 'random', 'weighted_random', 'max_weight'
export const PLAYER_1_AI_TYPE = 'random';
//Enable AI for player 2, boolean
export const PLAYER_2_AI = true;
//AI type from player 2, 'first', 'random', 'weighted_random', 'max_weight'
export const PLAYER_2_AI_TYPE = 'weighted_random';
//Axis field count, even integer >= 6
export const FIELDS = 8;
//Field size in pixels, even integer
export const FIELD_SIZE = 8;
//Chip radius in pixels, even integer < FIELD_SIZE
export const CHIP_SIZE = 6;
//Grid border size in pixels, integer
export const BORDER_SIZE = 1;
//Scale the canvas to this percentage of the smallest window dimension, decimal between 0 and 1
export const SCALE = .9;
//Limit the canvas scale to this factor, 0 for no limit
export const MAX_SCALE = 5;
//Background color, hex/rgba
export const BACKGROUND_COLOR = '#cc4d4d';
//Grid color, hex/rgba
export const GRID_COLOR = '#8c2e2e';
//Player 1 chip color, hex/rgba
export const PLAYER_1_COLOR = '#ffffff';
//Player 2 chip color, hex/rgba
export const PLAYER_2_COLOR = '#000000';
//AI move delay, min to max in milliseconds, integer, min < max
export const AI_MOVE_DELAY = [500, 2000];
//Valid move hinting, boolean
export const HINT = true;
//Valid move hint alpha, least captured to most captured chips, decimal between 0 and 1, min < max
export const HINT_ALPHA = [.05, .25];
//Score bar height
export const SCORE_BAR_HEIGHT = 1;
