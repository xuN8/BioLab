// Class constructors are defined here

function Virus(name, traits) {
  this.name = name;
  this.traits = traits;
  
  // Add it to the viruses dictionary
  viruses.push(this);

  const option = document.createElement("OPTION");
  option.id = name;
  option.title = traits;
  option.innerHTML = name;
  hotbar.appendChild(option);
  this.option = option;

  this.report = function() {
    console.log("Name: " + this.name);
    console.log("Traits: " + this.traits);
    console.log("----");
  };

  this.destroy = function() {
    // Remove all DOM elements related to this virus
    this.option.remove();
  };
}

function Host(name) {
  console.log("Spawning " + name + "...");

  this.name = name;
  this.symptoms = [];
  this.x = 150;
  this.y = 150;
  this.dx = 0;
  this.dy = 0;
  this.size = 50;
  this.color = 255; // White

  hosts.push(this);   // Add it to the "hosts" array

  this.greet = function() {
    console.log("Hi, my name is " + this.name + ".");
  };

  this.cure = function() {
    // Clear symptoms array
    this.symptoms = [];
    console.log(this.name + " has been cured.");
  };

  this.inject = function(virus) {   
    // Merge existing symptoms with new virus symptoms
    this.symptoms = this.symptoms.concat([...virus.traits]);

    console.log("You injected " + virus.name + " into " + this.name + ".");
    console.log("Here were " + this.name + "'s symptoms in order of occurence:");
    console.log(this.symptoms);
    console.log(this.symptoms[0]);

    for (let i=0; i<this.symptoms.length; i++) {
      setTimeout(() => {
        const symptom = this.symptoms[i];
        const traitData = traits[symptom];
        for (const [key, value] of Object.entries(traitData)) {
          console.log(key);
          console.log(value);
          this[key] = value;
        }
      }, i*1000);
    }   
  };

  this.getBloodSample = function() {
    console.log("You extracted a blood sample from " + this.name);

    // Clone the symptoms array to send
    const bloodSample = [...this.symptoms];
    return bloodSample;
  };

  this.onStep = function() {
    // Root part
    fill(this.color);
    square(this.x-this.size/2, this.y-this.size/2, this.size);

    // Name tag
    fill(0);
    textSize(this.size/5);
    textAlign(CENTER, CENTER);
    text(this.name, this.x, this.y);
    
    // Movement
    this.x += this.dx;
    this.y += this.dy;
  }
}