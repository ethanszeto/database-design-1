var states = {
  promptUsername: "Prompt username",
  processUsername: "Entering username",
  promptPassword: "Prompt password",
  processPassword: "Entering password",
  promptInvalidLogin: "Prompt Invalid Login",
  promptSpellType: "Prompt spell type",
  processSpellType: "Prompt spell type",
};

var enteredUsername;
var enteredPassword;

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
    case states.promptSpellType:
      promptSpellType();
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
    currentState = states.promptSpellType;
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

async function promptSpellType() {
  let prompt = "\n\n";
  const spells = await postJSON({}, "get-spell-types");
  addTextTerminalOutput(prompt);
  currentState = states.processSpellType;
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
