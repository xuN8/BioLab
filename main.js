var extractorStamp = 0;
var splitterStamp = 0;
var mergerStamp = 0;

// List of all possible symptoms that the host can experience
const traits = [
  "warts", 
  "screams", 
  "hiccups", 
  "swelling",
  "inflammation",
  "shaking",
  "babbling"
  ];

function extractVirus(bloodSample) {
  console.log("You placed the sample into the virus extractor.")
  console.log("Extracting virus from blood sample...");

  // Turn the array into a Virus object
  extractorStamp += 1;
  const virus = new Virus("K-"+extractorStamp.toString(), bloodSample);

  virus.report();

  return virus;
}

function splitVirus(virus) {
  console.log("You placed the virus into the virus splitter.")
  console.log("Splitting the virus...")

  // Grab each trait from the virus and make it it's own pure virus
  // Combine all the pure viruses into an array to return
  const splitViruses = [];
  virus.traits.forEach(function(value, index, array) {
    splitterStamp += 1;
    const split = new Virus("Sp-"+splitterStamp.toString(), [value]);
    splitViruses.push(split);
    split.report();
  });

  return splitViruses;
}

function mergeViruses(...viruses) {
  console.log("You placed the viruses into the virus merger.");
  console.log("Merging the following viruses:");

  mergerStamp += 1;

  // Combine the traits of all the viruses into one array
  var allTraits = [];
  viruses.forEach(function(value, index, array) {
    console.log(value.name);
    allTraits = allTraits.concat([...value.traits]);
  });

  const mergedVirus = new Virus("M-"+mergerStamp.toString(), allTraits);
  mergedVirus.report();

  return mergedVirus;
}

function Virus(name, traits) {
  this.name = name;
  this.traits = traits;

  this.report = function() {
    console.log("Name:", this.name);
    console.log("Traits:", this.traits);
    console.log("----");
  }
}

function Host(name) {
  console.log("Spawning " + name + "...");

  this.name = name;
  this.symptoms = [];

  this.greet = function() {
    console.log("Hi, my name is " + this.name + ".");
  };

  this.cure = function() {
    this.symptoms = [];
    console.log(this.name + " has been cured.");
  };

  this.injectRandom = function() {
    // Take four traits at random to construct a new virus
    for (var i=0; i<4; i++) {
      const trait = traits[Math.floor(Math.random()*traits.length)];
      this.symptoms.push(trait);
    };

    console.log("You injected a random virus into " + this.name + ".");
    console.log("Here were " + this.name + "'s symptoms in order of occurence:");
    console.log(this.symptoms);
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

    const bloodSample = [...this.symptoms];
    return bloodSample;
  };
}

const jeff = new Host("Jeff");
jeff.greet();
jeff.injectRandom();

const jeffsBlood = jeff.getBloodSample();
const virus = extractVirus(jeffsBlood);
const split = splitVirus(virus);

const sp1 = split[0];
const sp2 = split[1];
const newVirus = mergeViruses(sp1, sp2);

jeff.cure();
jeff.inject(newVirus);


















/*
var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function showGrid() {
  grid.forEach(function(value, index, array) {
    console.log(value);
  });
}

showGrid()
*/