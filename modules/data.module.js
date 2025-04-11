// This is temprary solution to store data / in future get data from Automation-db-API.
module.exports = {
  targetProfiles: [
    1, 4, 6, 8, 9, 12, 15, 16, 17, 31, 32, 33, 34, 36, 43, 55, 56, 57, 58, 60,
    63, 66, 67, 68, 72, 73,
  ],
  channelURLs: [], // Channels to subscribe
  likeURLs: [], // Videos to like
  videoURLs: [], // Videos to watch

  //   --- Temp ---
  url: "https://youtu.be/kNDPSKnNT8g?si=jA1cQh5sftzxgK0B", // unknown
  // url: "https://www.youtube.com/shorts/n4BhEaun5jo", // short
  // url: "https://www.youtube.com/watch?v=Luj9R7f5YRM&t=271s", // video
  // url: "https://youtu.be/1y5OBP06RBE?si=KQ-E3dWWzaT3NNxw", // general
  profileTarget: 2,
};
module.exports.options = {
  profileTarget: process.env.CHORME_TARGET_PROFILE,
  chatURL: process.env.CHORME_CHAT_URL,
  // chatURL: "https://accounts.google.com/signup/v2/webcreateaccount",
  // windowSize: [974, 1047],
  // windowPosition: [953, 0],
  // windowSize: [814, 859],
  // windowPosition: [793, -5],
  // For Office Desktop
  // windowSize: [697, 727],
  // windowPosition: [676, 0],
  // For acer Laptop
  windowSize: [782, 831],
  windowPosition: [761, 0],
};
module.exports.Accounts = {
  gmailWithoutProfile: [
    { gmail: "shivanijangha@gmail.com", password: "hhjsm001" },
  ],
  gmailWithProfile: [
    {
      Profile: 1,
      gmail: "jitendranathswamijsm@gmail.com",
      password: "hhjsm001",
    },
    { Profile: 2, gmail: "rec1to100@gmail.com", password: "hhjsm001" },
    { Profile: 3, gmail: "sahibakhanhhjsm@gmail.com", password: "hhjsm001" },
    { Profile: 4, gmail: "ambikagodha@gmail.com", password: "hhjsm001" },
    { Profile: 5, gmail: "aaptevanshika@gmail.com", password: "hhjsm001" },
    { Profile: 6, gmail: "prashantshekhar402@gmail.com", password: "hhjsm001" },
    { Profile: 7, gmail: "sonisuparna3@gmail.com", password: "hhjsm001" },
    { Profile: 8, gmail: "nafisakhanhhjsm@gmail.com", password: "hhjsm001" },
    { Profile: 9, gmail: "saibhavi74@gmail.com", password: "hhjsm001" },
    { Profile: 10, gmail: "palwaisharma244@gmail.com", password: "hhjsm001" },
    { Profile: 11, gmail: "gaurihussain4@gmail.com", password: "hhjsm001" },
    { Profile: 12, gmail: "vanikashah003@gmail.com", password: "hhjsm001" },
    {
      Profile: 13,
      gmail: "ruchikashindehhjsm@gmail.com",
      password: "hhjsm001",
    },
    // { Profile: 14, gmail: "shivanijangha@gmail.com", password: "hhjsm001" },
  ],
  async fetchAccWithout(typeOfAccount) {
    if (typeOfAccount === "ChromeProfile") return this.gmailWithoutProfile;
  },
};
