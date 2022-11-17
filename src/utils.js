export function getRandomInt(max) {
return Math.floor(Math.random() * max);
}

export function wait(milliseconds){
return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
});
}