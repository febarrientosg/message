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
  pixelDensity(2);
  textSize(17);
  let sketchContainer = document.getElementById("sketch-container");
  let canvas = createCanvas(sketchContainer.offsetWidth, windowHeight - 36); // Set height as per your requirement
  canvas.parent("sketch-container");

  partySubscribe("newMessage", displayMessage);

  input = createInput();
  input.parent("sketch-input");
  input.style("width", "100%");

  // Attach an event listener for the 'Enter' key press
  input.elt.onkeypress = function (e) {
    if (e.keyCode == 13) {
      e.preventDefault(); // Prevent the default action to avoid form submission
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
  fill(0);
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

let messages = []; // Array to store received messages

function displayMessage(message) {
  messages.push(message); // Add the received message to the array
  // You may want to limit the number of messages stored to avoid memory issues
  if (messages.length > 100) {
    // Just as an example limit
    messages.shift(); // Remove the oldest message
  }
}

function sendMessage() {
  let messageText = input.value().trim();
  if (messageText !== "") {
    partyEmit("newMessage", messageText); // Emit the message event with the message text
    input.value(""); // Clear the input field
  }
}
