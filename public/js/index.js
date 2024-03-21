document.getElementById("terminal-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    var command = document.getElementById("terminal-input").value + "\n";
    addTextTerminalOutput(command);
    // process command
    document.getElementById("terminal-input").value = "";
    resizeTerminalOutput();
  }
});

function resizeTerminalOutput() {
  document.getElementById("terminal-output").style.height = "";
  document.getElementById("terminal-output").style.height = document.getElementById("terminal-output").scrollHeight + "px";
}

function addTextTerminalOutput(str) {
  document.getElementById("terminal-output").value += str;
}
