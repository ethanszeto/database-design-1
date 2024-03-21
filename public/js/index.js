document.getElementById("terminal-input").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    var command = document.getElementById("terminal-input").value + "\n";
    addTextTerminalOutput("> " + command);
    document.getElementById("terminal-input").value = "";
    // process command
    program(command.trim());
  }
});

function resizeTerminalOutput() {
  document.getElementById("terminal-output").style.height = "";
  document.getElementById("terminal-output").style.height = document.getElementById("terminal-output").scrollHeight + "px";
}

function addTextTerminalOutput(str) {
  document.getElementById("terminal-output").value += str;
  resizeTerminalOutput();
}
