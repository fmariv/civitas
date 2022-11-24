/**
 * Get a random integer with a given maximum value
 * @param {*} max Maximum value to get the random integer from
 * @returns Random integer
 */
export function getRandomInt(max) {
  if (!max) {
    console.error('Oops! There is a problem getting the cities total count...');
  } else {
    return Math.floor(Math.random() * max);
  }
}

/**
 * Wait a given number of milliseconds
 * @param {*} milliseconds Milliseconds to wait
 * @returns Waiting promise
 */
export function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Show a given HTML element by ID
 * @param {*} id ID of the element to show
 */
export function showElement(id) {
  document.getElementById(id).style.visibility = 'visible';
}

/**
 * Hide a given HTML element by ID
 * @param {*} id ID of the element to hide
 */
export function hideElement(id) {
  document.getElementById(id).style.visibility = 'hidden';
}
