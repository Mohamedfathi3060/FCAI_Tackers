const axios = require("axios");
const player = require("play-sound")();

const accountSid = "AC05868868a9948e692ad790ebe91b94e1";
const authToken = "518e1286a3c85a69e1d5342d7a8da885";
const client = require("twilio")(accountSid, authToken);

// Send Request to check if register
// OK === Play;
// FAIL === Reapeat;
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIxMDM0OCIsImF1dGgiOiJST0xFX1NUVURFTlQiLCJleHAiOjE3MTAzNjc2ODN9.dxJGLPG-GpZwML1ccwxpALkxkparlGW2FkCoDY25O2rW45mzggoX2goIRQ_Jn0E1FEhjTV9lWqNvCXZ5IUiRlQ",
  // Add more headers if needed
};
const sendMessageTo = (number) => {
  client.messages
    .create({
      body: `Registration is opened Now, Hurry! ⌛⌛⌛`,
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
    sendMessageTo("01113931845");
    sendMessageTo("01024068783");
    sendMessageTo("01149800106");
    sendMessageTo("01093598773");
    sendMessageTo("01224781985");
  } else {
    // Still Not Opened
    console.log("Still not Openeed");
  }
};
checkRegistration();
sendMessageTo("01113931845");
sendMessageTo("01024068783");
setInterval(checkRegistration, 300000);
