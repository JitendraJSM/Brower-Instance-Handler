require("dotenv").config();
const utils = require("./utils/utils.js");

async function main() {
  await utils.getCurrentMachineName();
}
main();
