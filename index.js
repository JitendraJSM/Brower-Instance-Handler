require("dotenv").config();
const utils = require("./utils/utils.js");

// 1. Get the current Machine's username
const systemName = await utils.getCurrentMachineName();

async function updateSystemSetup() {
  // 1. Get all members of which do not have chrome profile the current system
  /* Note- At present API to get "All members which do have chrome profile the current system" is not developed yet so till then let's give that array as variable. */
  const members = [{}, {}, {}, {}];
}
updateSystemSetup();

// C:\Program Files\Google\Chrome\Application\chrome.exe --profile-directory="Profile 2" --remote-debugging-port=9222 --window-size=1366,768 --window-position=0,0
