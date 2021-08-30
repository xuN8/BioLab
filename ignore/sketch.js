function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(255);

  hosts.forEach(function(value, index, array) {
    square(value.x, value.y, 50);
    fill(0);
  });
  
}