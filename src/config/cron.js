import cron from "cron";
import https from "https";
import "dotenv/config";

const job = new cron.CronJob("*/14 * * * *", function () {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error("API_URL is not set");
    return;
  }

  https
    .get(apiUrl, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals