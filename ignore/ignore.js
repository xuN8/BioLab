function extractVirus(bloodSample) {
  console.log("You placed the sample into the virus extractor.");
  console.log("Extracting virus from blood sample...");

  // Turn the array into a Virus object
  extractorStamp += 1;
  const virus = new Virus("K-"+extractorStamp.toString(), bloodSample);

  virus.report();

  return virus;
}

function splitVirus(virus) {
  console.log("You placed the virus into the virus splitter.");
  console.log("Splitting the virus...");

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

/*
// Make a host named Jeff
const jeff = new Host("Jeff");
jeff.greet();

// Inject a random virus into Jeff
jeff.injectRandom();

// Get the virus from Jeff's blood
const jeffsBlood = jeff.getBloodSample();
const virus = extractVirus(jeffsBlood);

// Split the virus and combine the first two into a new virus
const split = splitVirus(virus);
const sp1 = split[0];
const sp2 = split[1];
const newVirus = mergeViruses(sp1, sp2);

// Clear Jeff's symptoms and inject the new virus
jeff.cure();
jeff.inject(newVirus);
*/