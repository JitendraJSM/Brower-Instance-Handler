require("dotenv").config();
const os = require("os");
const readline = require("readline");

const checkImportFromUtils = () => {
  console.log("All Utils Imported Successfully");
};
exports.checkImportFromUtils = checkImportFromUtils;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;

// exports.timeout30Sec = { timeout: 30000 };      // Should be in constants.js file

// NOTE:- You must pass options object as second argument it could be empty to take default values but it must be there.
// func passed to this shuold not call any other function, if it does then may or may not have some bugs.
// func passed to this must not have try-catch block.

const robustPolling = async (func, options = {}, ...args) => {
  const {
    maxAttempts = 30,
    delayMs = 1000,
    timeoutMs = 30000,
    retryCondition = () => true,
  } = options;
  return new Promise(async (resolve, reject) => {
    let errMSG,
      attempts = 0;
    const startTime = Date.now();
    while (attempts < maxAttempts && Date.now() - startTime < timeoutMs) {
      attempts++;
      try {
        const result = await func(...args);

        if (result && retryCondition(result)) {
          resolve(result);
          break;
        }
      } catch (err) {
        errMSG = err.message;
        console.log(`Attempt ${attempts} failed with error:`, errMSG);
      }

      await delay(delayMs);
    }
    reject(
      `Function failed after ${maxAttempts} attempts. with Error: ${errMSG}`
    );
  });
};
exports.robustPolling = robustPolling;

// ---- new Utiles developed while developing YTAutomation. ----

/**
 * Generates a random delay between given min and max seconds
 * and pauses the execution of the program for that amount of time.
 * @param {number} maxSec The maximum delay in seconds.
 * @param {number} minSec The minimum delay in seconds. default is 0.25 seconds.
 */
const randomDelay = async (maxSec, minSec = 0.25) => {
  await delay(
    (Math.floor(Math.random() * (maxSec - minSec) * 10) + minSec * 10) * 100
  );
};
exports.randomDelay = randomDelay;

const getDateTime = () => {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const indianDateTime = date
    .toLocaleString("en-IN", options)
    .replace(/\//g, "-");
  return indianDateTime;
};
exports.getDateTime = getDateTime;

async function askUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
exports.askUser = askUser;

async function getCurrentMachineName() {
  // Get the current user's username
  let currentMachine = os.userInfo().username;
  console.log(
    `Current Machine on which Automation is going to run: ${currentMachine}`
  );

  if (currentMachine !== "acer" && currentMachine !== "Er. Jitendra Nath")
    //  1. Ask user for the system configuration
    currentMachine = await askUser(
      `\nWhich system is this,\n\tPress '1' for Office.\n\tPress '2' for Home.\nThen press 'Enter':\t`
    );

  if (currentMachine === "1" || currentMachine === "acer") {
    process.env.CURRENT_MACHINE = "Office";
    return "Office";
  } else if (currentMachine === "2" || currentMachine === "Er. Jitendra Nath") {
    process.env.CURRENT_MACHINE = "Home";
    return "Home";
  } else {
    console.log(`\x1b[31mWrong Input, TRY AGAIN.\x1b[0m`);
    console.log(
      `Current Machine on which Automation is going to run: ${currentMachine}`
    );
    return false;
  }
}
exports.getCurrentMachineName = getCurrentMachineName;

// --------------------------------------------------------------
