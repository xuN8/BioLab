// Get the json file from the directory to proccess
fetch('./content.json')
  .then(response => response.json())
  .then(function(content) {
    for (const [key, value] of Object.entries(content)) {
      // The last JSON key-value pair is an empty array; ignore it
      if (key) {
        document.getElementsByTagName(key)[0].innerHTML = value;      
      }		
    }
  });