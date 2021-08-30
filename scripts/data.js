function save() {
  console.log("Save");

  const fileName = "biolab-data.json"
  
  // This variable stores all the data
  let data = JSON.stringify({"inventory":viruses});
  console.log(data);

  // Convert the text to BLOB
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = fileName;	   // The file to save the data

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

function load() {
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

document.getElementById("load").addEventListener("change", load, false);