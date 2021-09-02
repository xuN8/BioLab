// Low Level Functions
function forAllSelectedDo(func) {
  // Look through every virus' option to see if it is selected
  for (var i=0; i<viruses.length; i++) {
    const option = viruses[i].option;
    if (option && option.selected) {
      func(viruses[i], i);
    }
  }
}

function deselectAll() {
  // Uncheck all selected items
  forAllSelectedDo(function(virus) {
    virus.option.selected = false;
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
    const traitNames = Object.keys(traits);
    const randTraitName = traitNames[Math.floor(Math.random() * traitNames.length)]

    //const trait = traits[Math.floor(Math.random()*traits.length)];
    randTraits.push(randTraitName);
  };  

  new Virus(name, randTraits);
}

function destroyVirus() {
  console.log("Destroy");

  // Keep all the unselected ones in a new array
  // This prevents array items from being undefined
  var newArray = [];

  // Look through every virus' option to see if it is selected
  for (var i=0; i<viruses.length; i++) {
    const option = viruses[i].option;
    if (option && option.selected) {
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

  // Look through every virus' option to see if it is selected
  for (var i=0; i<viruses.length; i++) { 
    const option = viruses[i].option;
    if (option && option.selected) {
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

// Save/Load Data
function saveData() {
  console.log("Save");

  const fileName = "biolab-data.json"
  
  // This variable stores all the data
  let data = JSON.stringify({"inventory":viruses});
  console.log(data);

  // Convert the text to BLOB
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = fileName;    // The file to save the data

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
  }

  newLink.click(); 
}

function loadData() {
  clearInventory();

  const file = this.files[0]
  fileName = file.name;  
  var fr=new FileReader();
  fr.onload=function(){
    const inventory = JSON.parse(fr.result).inventory;
    inventory.forEach(function(value) {
      new Virus(value.name, value.traits);
    })
  }
                  
  fr.readAsText(this.files[0]);       
}

document.getElementById("load").addEventListener("change", loadData, false);