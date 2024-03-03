const axios = require("axios");
const player = require("play-sound")();

const accountSid = "AC05868868a9948e692ad790ebe91b94e1";
const authToken = "e2af53a15928c8680532601a734fc84b";
const client = require("twilio")(accountSid, authToken);

// Send Request to check if register
// OK === Play;
// FAIL === Reapeat;
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIxMDM0OCIsImF1dGgiOiJST0xFX1NUVURFTlQiLCJleHAiOjE3MTA0MDI2NDV9.5mE64qiMy5FlSELYKnN3v9VXpRqS8b0YP8pKbrmU8nIXLxB3b8F3F-W0ITPfXKzWbzuOi8E4kcOHPr4DAMBimQ",
  // Add more headers if needed
};
const appear = `Registration is opened Now, Hurry! ⌛⌛⌛`;
const NotAppear = `Testing ...`;

const sendMessageTo = (number, text) => {
  client.messages
    .create({
      body: text,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+2${number}`,
    })
    .then((message) => console.log(message.sid));
};
const checkRegistration = async () => {
  const res = await axios({
    method: "GET",
    url: "http://193.227.14.58/api/student-registration-courses?studentId=20210348",
    headers,
  });
  if (
    res.data.prerequistesSatistfiedCourses.length != 0 ||
    res.data.responseCode != -1
  ) {
    sendMessageTo("01024068783", appear);
    sendMessageTo("01113931845", appear);
    sendMessageTo("01149800106", appear);
    sendMessageTo("01093598773", appear);
    sendMessageTo("01224781985", appear);
    sendMessageTo("01155313475", appear);
  } else {
    // Still Not Opened
    console.log(res.data);
    console.log("Still not Openeed");
  }
};
checkRegistration();
sendMessageTo("01024068783", NotAppear);
setInterval(checkRegistration, 60000);
