function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(255);

  hosts.forEach(function(host) {
    host.onStep();
  });  
}