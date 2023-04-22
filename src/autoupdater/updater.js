const uaup = require('uaup-js');
const defaultStages = {
    Checking: "Checking For Updates!", // When Checking For Updates.
    Found: "Update Found!", // If an Update is Found.
    NotFound: "No Update Found.", // If an Update is Not Found.
    Downloading: "Downloading...", // When Downloading Update.
    Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Launching..." // When Launching the Application.
};

const updateOptions = {
    useGithub: true, // {Default is true} [Optional] Only Github is Currenlty Supported.
    gitRepo: "NodeJSRentAcc", // [Required] Your Repo Name
    gitUsername: "tihung99123", // [Required] Your GitHub Username.
};
uaup.CheckForUpdates(updateOptions);

module.exports = { uaup }