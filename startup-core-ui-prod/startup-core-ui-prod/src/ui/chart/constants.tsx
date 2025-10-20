export const COLORS = {
  GREEN: '#0B9C66',
  BLUE: '#4290D2',
  ORANGE: '#EA8106',
  GRAY: '#606774',
  RED: '#DB4343',
  YELLOW: '#F6E226',
  VIOLET: '#663BB7',
};

function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export const colorAlpha = (color: keyof typeof COLORS, alpha: number) =>
  addAlpha(COLORS[color], alpha);
