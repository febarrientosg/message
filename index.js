let input;
let me;
let guests;
let messages = [];
let guestColors = {}; // Object to store each guest's ID and associated color

function preload() {
  partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "main");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
    color: color(random(255), random(255), random(255)).toString("#rrggbb"), // Assign a unique random color
  });
  guests = partyLoadGuestShareds();
}

function setup() {
  pixelDensity(2);
  textSize(17);
  let sketchContainer = document.getElementById("sketch-container");
  let canvas = createCanvas(sketchContainer.offsetWidth, windowHeight - 36);
  canvas.parent("sketch-container");

  partySubscribe("newMessage", displayMessage);

  input = createInput();
  input.parent("sketch-input");
  input.style("width", "100%");

  input.elt.onkeypress = function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  window.addEventListener("resize", () => {
    resizeCanvas(sketchContainer.offsetWidth, windowHeight - 36);
  });
}

function draw() {
  background("#e1e1e1");
  drawGuestCursors();
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(16);

  let y = height - 10; // Start drawing from the bottom
  for (let i = messages.length - 1; i >= 0; i--) {
    // Iterate from newest to oldest
    let msgObj = messages[i];
    fill(msgObj.color); // Use the color assigned to the sender for the ellipse
    ellipse(13, y - 9, 15, 15); // Draw the user identifier ellipse
    fill("black"); // All text will now be in black
    text(msgObj.text, 25, y); // Adjust text position to accommodate the ellipse
    y -= 30; // Move up for the next message
    if (y < 0) break; // Stop drawing if the text goes out of the upper bound
  }
}

function drawGuestCursors() {
  for (const guest of guests) {
    fill(guest.color); // Set the ellipse color to the guest's assigned color
    ellipse(guest.x, guest.y, 20, 20);
  }
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY;
}

function displayMessage(messageObj) {
  messages.push(messageObj); // Add new messages to the end of the array
  if (messages.length > 100) {
    messages.shift(); // Remove the oldest message from the start
  }
}

function sendMessage() {
  let messageText = input.value().trim();
  if (messageText !== "") {
    let messageObj = {
      guestID: me.id,
      text: messageText,
      color: me.color, // Include the current user's color in the message (for the ellipse)
    };
    partyEmit("newMessage", messageObj);
    input.value("");
  }
}

// Users with number
//_______
// let input;
// let me;
// let guests;
// let messages = [];
// let globalData; // Shared global data containing usernames
// let assignedUsernames = {}; // Guest ID to username mapping

// function preload() {
//   partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "main");

//   // Load or initialize the global shared data
//   globalData = partyLoadShared("global", {
//     usernames: [],
//   });

//   // Load the individual shared object for the current user
//   me = partyLoadMyShared({
//     x: windowWidth / 2,
//     y: windowHeight / 2,
//     username: "",
//   });

//   guests = partyLoadGuestShareds();
// }

// function setup() {
//   pixelDensity(2);
//   textSize(17);
//   let sketchContainer = document.getElementById("sketch-container");
//   let canvas = createCanvas(sketchContainer.offsetWidth, windowHeight - 36);
//   canvas.parent("sketch-container");

//   // Subscribe to new messages
//   partySubscribe("newMessage", displayMessage);

//   // Set up the input field
//   input = createInput();
//   input.parent("sketch-input");
//   input.style("width", "100%");

//   input.elt.onkeypress = function (e) {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   window.addEventListener("resize", () => {
//     resizeCanvas(sketchContainer.offsetWidth, windowHeight - 36);
//   });

//   // Assign a unique username based on available names
//   assignUniqueUsername();
// }

// function draw() {
//   background("#e1e1e1");
//   drawGuestCursors();
//   noStroke();
//   textAlign(LEFT, BOTTOM);
//   textSize(16);

//   let y = height - 10; // Start drawing from the bottom up
//   for (let i = messages.length - 1; i >= 0; i--) {
//     let msgObj = messages[i];
//     let label = msgObj.username ? `${msgObj.username}:` : "Unknown:";
//     let textContent = `${label} ${msgObj.text}`;

//     // Calculate text height and adjust position
//     let textHeight = textAscent() + textDescent();
//     y -= textHeight + 10;

//     if (y < 0) {
//       break; // Stop drawing if the text goes out of the upper bound
//     }

//     text(textContent, 10, y);
//   }
// }

// function drawGuestCursors() {
//   for (const guest of guests) {
//     fill(0); // Black color for the ellipse cursor
//     ellipse(guest.x, guest.y, 20, 20);
//   }
// }

// function mouseMoved() {
//   me.x = mouseX;
//   me.y = mouseY;
// }

// function displayMessage(messageObj) {
//   messages.push(messageObj);
//   if (messages.length > 100) {
//     messages.shift();
//   }
// }

// function sendMessage() {
//   let messageText = input.value().trim();
//   if (messageText !== "") {
//     let messageObj = {
//       guestID: me.id,
//       username: me.username,
//       text: messageText,
//     };
//     partyEmit("newMessage", messageObj);
//     input.value("");
//   }
// }

// function assignUniqueUsername() {
//   // Use a simple numeric counter to find the next available username
//   let index = globalData.usernames.length + 1;
//   let newUsername = `User ${index}`;

//   // Store the username in the shared global data and update the current user
//   globalData.usernames.push(newUsername);
//   me.username = newUsername;
// }

// Color assigned
//_________________________
// let input;
// let me;
// let guests;
// let messages = [];
// let guestColors = {}; // Object to store each guest's ID and associated color

// function preload() {
//   partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "main");
//   me = partyLoadMyShared({
//     x: windowWidth / 2,
//     y: windowHeight / 2,
//     color: color(random(255), random(255), random(255)).toString("#rrggbb"), // Assign a unique random color
//   });
//   guests = partyLoadGuestShareds();
// }

// function setup() {
//   pixelDensity(2);
//   textSize(17);
//   let sketchContainer = document.getElementById("sketch-container");
//   let canvas = createCanvas(sketchContainer.offsetWidth, windowHeight - 36);
//   canvas.parent("sketch-container");

//   partySubscribe("newMessage", displayMessage);

//   input = createInput();
//   input.parent("sketch-input");
//   input.style("width", "100%");

//   input.elt.onkeypress = function (e) {
//     if (e.keyCode == 13) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   window.addEventListener("resize", () => {
//     resizeCanvas(sketchContainer.offsetWidth, windowHeight - 36);
//   });
// }

// function draw() {
//   background("#e1e1e1");
//   drawGuestCursors();
//   noStroke();
//   textAlign(LEFT, TOP);
//   textSize(16);

//   let y = 10;
//   for (let i = messages.length - 1; i >= 0; i--) {
//     let msgObj = messages[i];
//     fill(msgObj.color); // Use the color assigned to the sender
//     text(msgObj.text, 10, y);
//     y += 20;
//   }
// }

// function drawGuestCursors() {
//   for (const guest of guests) {
//     fill(guest.color); // Set the ellipse color to the guest's assigned color
//     ellipse(guest.x, guest.y, 20, 20);
//   }
// }

// function mouseMoved() {
//   me.x = mouseX;
//   me.y = mouseY;
// }

// function displayMessage(messageObj) {
//   messages.push(messageObj);
//   if (messages.length > 100) {
//     messages.shift();
//   }
// }

// function sendMessage() {
//   let messageText = input.value().trim();
//   if (messageText !== "") {
//     let messageObj = {
//       guestID: me.id,
//       text: messageText,
//       color: me.color, // Include the current user's color in the message
//     };
//     partyEmit("newMessage", messageObj);
//     input.value("");
//   }
// }
