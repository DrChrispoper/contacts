/* eslint-disable import/prefer-default-export */

export const checkIndex = (index: number, length: number): number => {
  let checkedIndex = 0;

  // Check for out of bounds index from scroll bouncing;
  if (index >= 0) {
    if (index >= length) {
      checkedIndex = length - 1;
    } else {
      checkedIndex = index;
    }
  }

  return checkedIndex;
};
