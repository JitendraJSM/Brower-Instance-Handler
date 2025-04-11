const db = require("../modules/data.module.js");
const utils = require("../utils/utils.js");

const { getBrowser } = require("../modules/browser.module.js");
const PageClass = require("../Classes/PageClass.js");

async function setupCheck() {
  // // 1. Ask user for the system configuration
  // const currentMachine = await getCurrentMachineName();

  // 2. Check if is there any account without profile
  let typeOfAccount = "ChromeProfile";
  // Get all accounts without profile of typeOfAccount
  // let accountsWithoutProfile = await db.Accounts.fetchAccWithout(typeOfAccount); // typeOfAccount = "ChromeProfile" | "YoutubeProfile" | "PinterestProfile" | "InstagramProfile" | "FacebookProfile"
  let accountsWithoutProfile = await db.Accounts.fetchAccWithout(typeOfAccount); // typeOfAccount = "ChromeProfile" | "YoutubeProfile" | "PinterestProfile" | "InstagramProfile" | "FacebookProfile"

  if (!accountsWithoutProfile.length)
    return `No accounts without ${typeOfAccount}  found.`;

  let flag = await utils.askUser(
    `If you want to create new ${typeOfAccount} , Press '1' and then press 'Enter':\t`
  );
  if (flag !== "1") return `No new ${typeOfAccount}  created.`;

  // // 3. Create new profile
  // let className = require(`../Classes/${typeOfAccount}.class.js`);
  // let ProfilePage = new className(page);
  // 4. Setup profile for the account.
  // await ProfilePage.newProfileSetup(account);

  //  3. Get Chrome Profile Target
  // Check all accounts and get the largest "Profile" number and increment it by 1.
  // let profileTarget = db.targetProfiles.reduce((a, b) => Math.max(a, b)) + 1;
  let profileTarget = 14;

  // QUESTION- This is simple to decide the profileTarget for new ChromeProfile (i.e. the 1st empty target profile) but what to do for other social media profiles as they have already have profileTarget?

  // 4. Open Chrome Instance of Target Profile
  db.options.profileTarget = profileTarget;

  let { browser, page } = await getBrowser(db.options);
  // page = new PageClass(page);

  let className = require(`../Classes/${typeOfAccount}.class.js`);
  let ProfilePage = new className(page);

  // 5. Setup profile for the account.
  console.log(
    `Setting up new Chrome Profile for ${accountsWithoutProfile[0].gmail} on Target Chrome: ${profileTarget}.`
  );

  const ProfileStatus = await ProfilePage.newProfileSetup(
    accountsWithoutProfile[0]
  );

  console.log(`ProfileStatus: ${ProfileStatus}`);

  console.log(`Ok till this End.`);

  return `setupCheck Done`;
}
module.exports.setupCheck = setupCheck;
