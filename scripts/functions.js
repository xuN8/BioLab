// Low Level Functions
function forAllSelectedDo(func) {
  // Look through every virus' checkbox to see if it is selected
  for (var i=0; i<viruses.length; i++) {
    const checkbox = viruses[i].checkbox;
    if (checkbox && checkbox.selected) {
      func(viruses[i], i);
    }
  }
}

function deselectAll() {
  // Uncheck all selected items
  forAllSelectedDo(function(virus) {
    virus.checkbox.selected = false;
  });
}

function clearInventory() {
  console.log("Clear inventory");

  for (var i=0; i<viruses.length; i++) {
    viruses[i].destroy();
  }

  viruses = [];
}

// High Level Functions
function randomVirus() {
  console.log("Random");

  // Generate a new virus name
  randomizerStamp ++; 
  const name = "R-"+randomizerStamp.toString();

  // Take four traits at random to construct a new virus
  var randTraits = [];
  for (var i=0; i<4; i++) {
    const trait = traits[Math.floor(Math.random()*traits.length)];
    randTraits.push(trait);
  };  

  new Virus(name, randTraits);
}

function destroyVirus() {
  console.log("Destroy");

  // Keep all the unselected ones in a new array
  // This prevents array items from being undefined
  var newArray = [];

  // Look through every virus' checkbox to see if it is selected
  for (var i=0; i<viruses.length; i++) {
    const checkbox = viruses[i].checkbox;
    if (checkbox && checkbox.selected) {
      viruses[i].destroy();
    } else {
      newArray.push(viruses[i]);
    }
  }

  viruses = newArray;
  deselectAll();
}

function duplicateVirus() {
  console.log("Duplicate");

  forAllSelectedDo(function(virus) {
    new Virus(virus.name, virus.traits);
  });
  deselectAll();
}

function mergeViruses() {
  console.log("Merge");

  mergerStamp ++;
  const name = "M-"+mergerStamp.toString();
  var mergedTraits = [];

  // Look through every virus' checkbox to see if it is selected
  for (var i=0; i<viruses.length; i++) { 
    const checkbox = viruses[i].checkbox;
    if (checkbox && checkbox.selected) {
      const traits = viruses[i].traits
      if (traits) {
        mergedTraits = mergedTraits.concat([...traits]);
      }        
    }       
  }
  
  // Maintain a merge limit of 4
  if (mergedTraits.length > 4) {
    mergedTraits = mergedTraits.slice(0, 4);
  }

  new Virus(name, mergedTraits);
  deselectAll();
}

function splitVirus() {
  console.log("Split");

  forAllSelectedDo(function(virus) {
    virus.traits.forEach(function(value) {
      splitterStamp ++;
      const name = "Sp-"+splitterStamp.toString();
      new Virus(name, [value]);
    });   
  });  

  deselectAll();
}

function info() {
  console.log("Info");

  forAllSelectedDo(function(virus) {
    virus.report();
  });

  deselectAll();
}

function injectVirus() {
  console.log("Inject");

  forAllSelectedDo(function(virus) {
    virus.destroy();
    host.inject(virus);
  });
  
  deselectAll();
}

function extract() {  
  console.log("Extract virus from blood");

  // Turn the array into a Virus object
  extractorStamp += 1;

  const bloodSample = host.getBloodSample();
  const virus = new Virus("K-"+extractorStamp.toString(), bloodSample);
}

function cure() {
  host.cure();
}