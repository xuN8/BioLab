const realConsoleLog = console.log
console.log = function(str) {
  realConsoleLog(str);
  const console = document.getElementById("console");
  console.innerHTML = console.innerHTML+"\n"+str;
  console.scrollTop = console.scrollHeight;
};