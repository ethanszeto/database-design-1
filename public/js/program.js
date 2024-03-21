var states = {
  promptUsername: "Prompt username",
  processUsername: "Entering username",
  promptPassword: "Prompt password",
  processPassword: "Entering password",
  promptInvalidLogin: "Prompt invalid login",
  promptOptionMenu: "Prompt option menu",
  processOptionSelection: "Process option selectiom",
  promptSpellType: "Prompt spell type",
  processSpellType: "Process spell type",
  promptInvalidSpellType: "Prompt invalid spell type",
};

var enteredUsername;
var enteredPassword;
var spells = [];

var currentState = states.promptUsername;

//initially call program
program("");

//define the program
function program(command) {
  switch (currentState) {
    case states.promptUsername:
      promptUsername();
      break;
    case states.processUsername:
      processUsername(command);
      break;
    case states.promptPassword:
      promptPassword();
      break;
    case states.processPassword:
      processPassword(command);
      break;
    case states.promptInvalidLogin:
      promptInvalidLogin();
      break;
    case states.promptOptionMenu:
      promptOptionMenu();
      break;
    case states.processOptionSelection:
      processOptionSelection(command);
      break;
    case states.promptSpellType:
      promptSpellType();
      break;
    case states.processSpellType:
      processSpellType(command);
      break;
    default:
      break;
  }
}

function exit(command) {
  if (command == "2") {
    //exit
  }
}

function promptUsername() {
  let prompt = "\nEnter the MySQL Username\n";
  addTextTerminalOutput(prompt);
  currentState = states.processUsername;
}

function processUsername(command) {
  enteredUsername = command;
  currentState = states.promptPassword;
  program("");
}

function promptPassword() {
  let prompt = "\nEnter the MySQL Password\n";
  addTextTerminalOutput(prompt);
  currentState = states.processPassword;
}

async function processPassword(command) {
  enteredPassword = command;
  var loginInfo = {
    username: enteredUsername,
    password: enteredPassword,
  };
  const loginResult = await postJSON(loginInfo, "login");
  const threadId = await postJSON({}, "thread-id");
  if (loginResult.result === "Pool Created" && parseInt(threadId.result) >= 0) {
    // good login credentials
    console.log(loginResult.result + " | " + threadId.result);
    currentState = states.promptOptionMenu;
    program("");
  } else {
    // bad login credentials
    currentState = states.promptInvalidLogin;
    program("");
  }
}

function promptInvalidLogin() {
  let prompt = "\nInvalid Login Info. Try again.\n";
  addTextTerminalOutput(prompt);
  currentState = states.promptUsername;
  program("");
}

function promptOptionMenu() {
  let prompt = "\nEnter a number corresponding to an option:\n1. Display all spell types\n2. Disconnect and close\n";
  addTextTerminalOutput(prompt);
  currentState = states.processOptionSelection;
}

function processOptionSelection(command) {
  if (command == "1") {
    currentState = states.promptSpellType;
    program("");
  } else if (command == "2") {
    //call some deactivate method that does cleanup.
  } else {
    let prompt = "\nInvalid Selection. Try again.\n";
    addTextTerminalOutput(prompt);
    program("");
  }
}

async function promptSpellType() {
  let prompt = "\nHere are a list of spell types:\n";
  if (spells.length == 0) {
    const rawSpells = await postJSON({}, "get-spell-types");

    rawSpells.forEach((spellType) => {
      spells.push(spellType.type_name.toLowerCase());
    });
  }

  spells.forEach((spellType) => {
    prompt += spellType + ", ";
  });

  prompt += "\n\nEnter a spell type\n";
  addTextTerminalOutput(prompt);
  currentState = states.processSpellType;
}

async function processSpellType(command) {
  if (spells.includes(command.toLowerCase())) {
    const rawSpells = await postJSON({ type: command }, "get-spells-with-type");
    console.log(rawSpells);
  } else {
    currentState = states.promptInvalidSpellType;
    program("");
  }
}

/////////////////////////////////////////////////

async function postJSON(data, endpoint) {
  try {
    const response = await fetch(`http://localhost:4321/requests/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    //console.log(result);
    return result;
  } catch (e) {
    return e;
  }
}
