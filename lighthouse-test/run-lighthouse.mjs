import lighthouse from "lighthouse";
import { writeFile } from "fs/promises";
import { launch } from "chrome-launcher";

const url = "http://localhost:8080";

(async () => {
  const chrome = await launch({ chromeFlags: ["--headless"] });

  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  // Save the Lighthouse HTML report
  const reportHtml = runnerResult.report;
  await writeFile("lighthouse-report.html", reportHtml);

  console.log("Lighthouse report is done!");
  console.log(`Performance score was: ${runnerResult.lhr.categories.performance.score * 100}`);

  await chrome.kill();
})();
