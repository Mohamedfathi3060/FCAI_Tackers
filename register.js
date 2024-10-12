const axios = require("axios");
require("dotenv").config();
const Pushover = require("pushover-notifications");
const p = new Pushover({
  user: process.env.PUSH_OVER_HONORx10,
  token: process.env.PUSH_OVER_TOKEN,
});
const appear = `Registration is opened Now, Hurry! ⌛⌛⌛`;
const NotAppear = `Testing ...`;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + process.env.FCAI_TOKEN, // Add more headers if needed
};

const sendMessageTo = (message) => {
  p.send({ message }, (err, result) => {
    if (err) console.error(err);
    else console.log("Message Sent  =>  " + result);
  });
};

const checkRegistration = async () => {
  const res = await axios({
    method: "GET",
    url: process.env.FCAI_URL,
    headers,
  });
  if (
    res.data.prerequistesSatistfiedCourses.length != 0 ||
    res.data.responseCode != -1 ||
    res.data.registeredCourses.length != 0
  ) {
    sendMessageTo(appear);
  } else {
    // Still Not Opened
    console.log(res.data);
    console.log("Still not Openeed");
  }
};
sendMessageTo(NotAppear);
setInterval(checkRegistration, 10 * 1000);
