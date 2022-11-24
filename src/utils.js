export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function showElement(id) {
  document.getElementById(id).style.visibility = "visible";
}

export function hideElement(id) {
  document.getElementById(id).style.visibility = "hidden";
}