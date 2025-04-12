require("dotenv").config();
const utils = require("./utils/utils.js");
const { getBrowser } = require("./modules/browser.module.js");

const membersHardCoded = [
  {
    _id: "67f79b0e8311460e31b9797a",
    gmail: "ramukakahhjsm001@gmail.com",
    recoveryMailVerified: false,
    systemProfiles: [],
  },
  {
    _id: "67f79b0e8311460e31b97978",
    gmail: "gitanjaliayyer@gmail.com",
    recoveryMailVerified: false,
    systemProfiles: [],
  },
  {
    _id: "67f79b0e8311460e31b97976",
    gmail: "padduhhjsm@gmail.com",
    recoveryMailVerified: false,
    systemProfiles: [],
  },
];

async function getNewMemberToAdd() {
  // 1. Get the current Machine's username
  const systemName = await utils.getCurrentMachineName();
  // 2. Get all members of which do not have chrome profile the current system
  const res = await fetch(
    `${process.env.API_URL}/members?systemName=-${systemName}`
  );
  const resJSON = await res.json();
  const members = resJSON.data.data;

  if (members.length === 0) {
    console.log("No members to add");
    return "No members to add";
  }
  // console.log(members);
  // console.log(members[0].systemProfiles);

  // 3. Get Available Chrome Profiles
  const nextProfileNumber = await utils.getAvailableChromeProfile();
  return { memberToAdd: members[0], nextProfileNumber: nextProfileNumber };
}

async function main() {
  // 1. Get the new member to add
  const memberToAdd = await getNewMemberToAdd();

  // 2. Open Chrome to add the member in current Machine
  const browserOptions = {
    profileTarget: memberToAdd.nextProfileNumber,
    chatURL: `https://www.youtube.com/` || process.env.CHORME_INITIAL_URL,
    windowSize: [814, 859],
    windowPosition: [793, 0],
    environment: process.env.ENVIRONMENT,
  };
  // console.log(browserOptions);
  let { browser, page } = await getBrowser(browserOptions);
  console.log(browser);
  page = await browser.newPage();
  await page.goto(browserOptions.chatURL);
  console.log("Browser and page initialized successfully");
  return memberToAdd;
}

main();
// C:\Program Files\Google\Chrome\Application\chrome.exe --profile-directory="Profile 1" --remote-debugging-port=9222 --window-size=1366,768 --window-position=0,0
// http://localhost:9222/json/version
