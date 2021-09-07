function setup() {
  console.log("Set up canvas");
  createCanvas(300, 300);
}

function draw() {
  background(255);

  hosts.forEach(function(host) {
    host.onStep();
  });  
}