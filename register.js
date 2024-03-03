const axios = require("axios");
require("dotenv").config();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + process.env.TOKEN, // Add more headers if needed
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
