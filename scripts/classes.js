// Class constructors are defined here

function Virus(name, traits) {
  this.name = name;
  this.traits = traits;
  
  // Add it to the viruses dictionary
  viruses.push(this);

  // Create a checkbox for the virus
  const checkbox = document.createElement("INPUT");
  checkbox.type = "checkbox";
  checkbox.id = name;
  hotbar.appendChild(checkbox);
  this.checkbox = checkbox;

  // Make a label for the checkbox
  const label = document.createElement("LABEL");
  label.for = checkbox.id;
  label.innerHTML = name;
  hotbar.appendChild(label);

  // Add a line break
  const lnBreak = hotbar.appendChild(document.createElement("BR"));

  this.report = function() {
    console.log("Name: " + this.name);
    console.log("Traits: " + this.traits);
    console.log("----");
  };

  this.destroy = function() {
    // Remove all DOM elements related to this virus
    checkbox.remove();
    label.remove();
    lnBreak.remove();
  };
}

function Host(name) {
  console.log("Spawning " + name + "...");

  this.name = name;
  this.symptoms = [];
  this.x = 0;
  this.y = 0;

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
  };

  this.getBloodSample = function() {
    console.log("You extracted a blood sample from " + this.name);

    // Clone the symptoms array to send
    const bloodSample = [...this.symptoms];
    return bloodSample;
  };
}