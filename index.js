const axios = require("axios");
const fs = require("fs");
const player = require("play-sound")();

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIxMDM0OCIsImF1dGgiOiJST0xFX1NUVURFTlQiLCJleHAiOjE3MTAzNjc2ODN9.dxJGLPG-GpZwML1ccwxpALkxkparlGW2FkCoDY25O2rW45mzggoX2goIRQ_Jn0E1FEhjTV9lWqNvCXZ5IUiRlQ",
  // Add more headers if needed
};
// const BASEurl = `http://newecom.fci.cu.edu.eg/api/student-courses?size=25&page=1`;
const BASEurl = `http://193.227.14.58:80/api/student-courses?size=25&page=1`;

let FATHI;

const ABDO = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: BASEurl + "&studentId.equals=20210036&includeWithdraw.equals=true",
      headers,
    });
    //console.log(res);
    if (res.status === 200) {
      console.log("valid response Come 'ABDO' ");
      const results = res.data;
      let data = {};
      results.forEach((course) => {
        if (course.grade != null) {
          data[course.course.name] = [course.result, course.grade];
        }
      });
      if (Object.keys(data).length !== 0) {
        // there is DATa
        fs.appendFileSync("./AbdoGrades.json", JSON.stringify(data));
        console.log("ABDO finish");
      } else {
        console.log("still not appeared 'ABDO'");
      }
    }
  } catch (err) {
    console.log("webSite dropped 'ABDO'");
  }
};

FATHI = setInterval(async () => {
  try {
    const res = await axios({
      method: "GET",
      url: BASEurl + "&studentId.equals=20210348&includeWithdraw.equals=true",
      headers,
    });
    if (res.status === 200) {
      console.log("valid response Come");
      const results = res.data;
      let data = {};
      results.forEach((course) => {
        if (course.grade != null) {
          data[course.course.name] = [course.result, course.grade];
        }
      });

      if (Object.keys(data).length !== 0) {
        // there is DATa
        clearInterval(FATHI);
        fs.appendFileSync("./fathiGrades.json", JSON.stringify(data));
        console.log("Fathi finish");
        await ABDO();
        console.log("Both finish");
        // Play a sound
        player.play("./alert-33762.mp3", (err) => {
          if (err) {
            console.error("Error occurred while playing sound:", err);
          }
        });
        // will Stop here ??
        //process.exit();
      } else {
        console.log("still not appeared");
      }
    }
  } catch (err) {
    console.log("webSite dropped");
  }
}, 1000);
// 193.227.14.58:80

const calc = async (id) => {
  // get User grades
  const res = await axios({
    method: "GET",
    url: BASEurl + `&studentId.equals=${id}&includeWithdraw.equals=true`,
    headers,
  });

  const results = res.data;
  let points = results[0].student.gpa * 63;
  console.log("initila points", points);
  console.log(results.length);
  results.forEach((course) => {
    if (course.grade === "A+") {
      points += 4 * 3;
    } else if (course.grade === "A") {
      points += 3.7 * 3;
    } else if (course.grade === "B+") {
      points += 3.3 * 3;
    } else if (course.grade === "B") {
      points += 3.0 * 3;
    } else if (course.grade === "C+") {
      points += 2.7 * 3;
    } else if (course.grade === "C") {
      points += 2.4 * 3;
    } else {
      console.log("eror");
    }
  });
  console.log("last points", points);
  console.log(Math.round((points / 81) * 100) / 100);
};
calc(20210402);
