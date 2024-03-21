let input;
let me;
let guests;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "main");
  me = partyLoadMyShared({
    x: windowWidth / 2,
    y: windowHeight / 2,
  });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  textSize(17);

  // Initialize p5.party

  // Subscribe to 'newMessage' events
  partySubscribe("newMessage", displayMessage);

  // Create the text input element
  input = createInput();
  input.position(10, windowHeight - 50);
  input.style("width", `${windowWidth - 20}px`);

  // Attach an event listener for the 'Enter' key press
  input.elt.onkeypress = function (e) {
    if (e.keyCode == 13) {
      e.preventDefault(); // Prevent the default action to avoid form submission
      sendMessage();
    }
  };
}

let messages = []; // Array to store received messages

function displayMessage(message) {
  messages.push(message); // Add the received message to the array
  // You may want to limit the number of messages stored to avoid memory issues
  if (messages.length > 100) {
    // Just as an example limit
    messages.shift(); // Remove the oldest message
  }
}

function draw() {
  background(220);
  drawGuestCursors();
  // Display all messages
  fill(0); // Set the text color to black
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);

  let y = 10;
  for (let i = messages.length - 1; i >= 0; i--) {
    // Iterate backwards to display the newest messages at the bottom
    text(messages[i], 10, y);
    y += 20; // Increment y position for the next message
  }
}

function drawGuestCursors() {
  for (const guest of guests) {
    ellipse(guest.x, guest.y, 20, 20);
  }
}

function mouseMoved() {
  me.x = mouseX;
  me.y = mouseY;
}

function sendMessage() {
  let messageText = input.value().trim();
  if (messageText !== "") {
    partyEmit("newMessage", messageText); // Emit the message event with the message text
    input.value(""); // Clear the input field
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(10, windowHeight - 50);
  input.style("width", `${windowWidth - 20}px`);
}

// let input;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   pixelDensity(2);
//   textSize(17);

//   // Initialize p5.party
//   partyConnect("wss://demoserver.p5party.org", "p5_messaging_app", "main");

//   // Subscribe to 'newMessage' events
//   partySubscribe("newMessage", displayMessage);

//   // Create the text input element
//   input = createInput();
//   input.position(10, windowHeight - 50);
//   input.style("width", `${windowWidth - 20}px`);

//   // Attach an event listener for the 'Enter' key press
//   input.elt.onkeypress = function (e) {
//     if (e.keyCode == 13) {
//       e.preventDefault(); // Prevent the default action to avoid form submission
//       sendMessage();
//     }
//   };
// }

// let messages = []; // Array to store received messages

// function displayMessage(message) {
//   messages.push(message); // Add the received message to the array
//   // You may want to limit the number of messages stored to avoid memory issues
//   if (messages.length > 100) {
//     // Just as an example limit
//     messages.shift(); // Remove the oldest message
//   }
// }

// function draw() {
//   background(220);
//   ellipse(mouseX, mouseY, 20, 20);
//   // Display all messages
//   fill(0); // Set the text color to black
//   noStroke();
//   textAlign(LEFT, TOP);
//   textSize(16);

//   let y = 10;
//   for (let i = messages.length - 1; i >= 0; i--) {
//     // Iterate backwards to display the newest messages at the bottom
//     text(messages[i], 10, y);
//     y += 20; // Increment y position for the next message
//   }
// }

// function sendMessage() {
//   let messageText = input.value().trim();
//   if (messageText !== "") {
//     partyEmit("newMessage", messageText); // Emit the message event with the message text
//     input.value(""); // Clear the input field
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   input.position(10, windowHeight - 50);
//   input.style("width", `${windowWidth - 20}px`);
// }
