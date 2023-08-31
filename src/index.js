const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cron =require("node-cron")
dotenv.config();
const enviroment = process.env;
const host = enviroment.HOST;
const closeUrl = host + enviroment.CLOSE_URL;
const authUrl = host + enviroment.AUTH_URL;
const username = enviroment.USER_NAME;
const password = enviroment.PASSWORD;
let jwt = "";

async function getToken() {
  const response = await fetch(authUrl, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: username, password: password }),
  });
  const json = await response.json();
  const jwt = json.jwt;
  
  return jwt;
}

async function closeAll(jwt) {
  const response = await fetch(closeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const json = await response.json();
  return json;
}

async function runCronTask() {
  jwt = await getToken();
  const response = await closeAll(jwt);
  // console.log(jwt);
  console.log(response);
}

now = new Date();
console.log('La fecha actual es',now);
//ejecutar runcrontask todos los dias a las 15:30
//           # ┌────────────── second (optional)
//           # │ ┌──────────── minute
//           # │ │ ┌────────── hour
//           # │ │ │ ┌──────── day of month
//           # │ │ │ │ ┌────── month
//           # │ │ │ │ │ ┌──── day of week
//           # │ │ │ │ │ │
//           # │ │ │ │ │ │
//           # * * * * * *
cron.schedule("*/5 * * * *", () => {
  runCronTask();
});

