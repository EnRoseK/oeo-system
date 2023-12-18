export const emailChecker = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi, 'gm');

export const passwordChecker = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
