// API GOT
const URL_API = "https://thronesapi.com/api/v2/Characters";
let characters = [];
let currentPlayerID = 3;

// define default selected chars for players
const players = [
  {
    id: 3,
    targets: [
      {
        id: 9,
        done: true,
      },
      {
        id: 6,
        done: false,
      },
      {
        id: 2,
        done: false,
      },
      {
        id: 4,
        done: true,
      },
      {
        id: 11,
        done: true,
      },
    ],
  },
  {
    id: 11,
    targets: [
      {
        id: 3,
        done: true,
      },
      {
        id: 14,
        done: true,
      },
      {
        id: 13,
        done: false,
      },
    ],
  },
  {
    id: 1,
    targets: [
      {
        id: 3,
        done: false,
      },
      {
        id: 7,
        done: true,
      },
      {
        id: 11,
        done: false,
      },
    ],
  },
  {
    id: 14,
    targets: [
      {
        id: 3,
        done: false,
      },
    ],
  },
];
const playerImgLogin = document.querySelector("[player-img-login]");
const playerNameLogin = document.querySelector("[player-name-login]");
const playerImg = document.querySelector("[player-img]");
const playerName = document.querySelector("[player-name]");
const playerFamily = document.querySelector("[player-family]");
const playerTargets = document.querySelector("#player-targets");
const tplItem = document.querySelector("#tpl-character");
const listCharacters = document.querySelector("#list-characters");

let currentPlayerDetails;

function renderPlayerData() {
  const currentPlayerData = getCurrentPlayerData(currentPlayerID);
   // console.log(currentPlayerData);
  //  get current player details
   currentPlayerDetails = getCharDetails(currentPlayerID);

  // avatar
  playerImgLogin.src = currentPlayerDetails.imageUrl;
  playerImg.src = currentPlayerDetails.imageUrl;

  // name
  playerNameLogin.innerText = currentPlayerDetails.firstName;
  playerName.innerText = currentPlayerDetails.firstName;
  playerFamily.innerText = currentPlayerDetails.family;

  // details
  document.querySelector("[player-firstname]").innerText =
    currentPlayerDetails.firstName;
  document.querySelector("[player-lastname]").innerText =
    currentPlayerDetails.lastName;
  document.querySelector("[player-title]").innerText =
    currentPlayerDetails.title;

  loadPlayerTargets(currentPlayerData.targets);
}

function loadPlayerTargets(targets) {
  playerTargets.innerHTML = "";

  /// targets
  let targetsDone = 0;
  targets.forEach((target) => {
    // add character
    addCharacter(target);
    if (target.done !== false) targetsDone++;
  });

  // calculate percent done
  const total = targets.length;
  //  10/40 × 100
  const percentDone = (targetsDone / total) * 100;

  document
    .querySelector("#circle-completed")
    .setAttribute("stroke-dasharray", `${percentDone}, 100`);
  document.querySelector("[targets-done]").innerText = targetsDone;
}

function addCharacter({ id, done }) {
  // get char data
  const char = characters.find((x) => x.id == id);
  const item = tplItem.content.cloneNode(true);
  item.querySelector("label").setAttribute("for", `player-${id}`);
  item.querySelector("[data-target-name]").innerText = char.fullName;
  item.querySelector("[data-target-family]").innerText = char.family;
  item.querySelector("img").src = char.imageUrl;
  const chk = item.querySelector("input");

  if (done) {
    item.querySelector("li").classList.add("done");
    //chk.setAttribute("checked", true);
    item.querySelector("span").classList.remove("!hidden");
    chk.remove();
  } else {
    chk.setAttribute("id", `player-${id}`);
    chk.value = id;
  }
  // add checkbox event
  chk.addEventListener("change", () => {
    updatePlayerTargets(chk);
  });
  playerTargets.append(item);
}

function updatePlayerTargets(chk) {
  // current player data
  const currentPlayerData = getCurrentPlayerData(currentPlayerID);
  // current player target
  const char = currentPlayerData.targets.find((x) => x.id == chk.value);
  // update char done state
  char.done = chk.checked ? true : false;

  // reload player targets and stats
  loadPlayerTargets(currentPlayerData.targets);
}

// list all characters
function listAlChars() {
  listCharacters.innerHTML = "";
  // current player data
  const playerTargets = getCurrentPlayerTargets(currentPlayerID);

  // Loop through each result and append the data.
  characters.map(({ id, fullName, family, image }) => {
    const char = characters.find((x) => x.id == id);

    // don't include current player
    if (id == currentPlayerID) return;

    // check char isn't already in current player list - TO DO
    if (playerTargets.find((x) => x.id == id)) return;

    const item = tplItem.content.cloneNode(true);
    item.querySelector("label").setAttribute("for", `target-${id}`);
    item.querySelector("[data-target-name]").innerText = char.fullName;
    item.querySelector("[data-target-family]").innerText = char.family;
    item.querySelector("img").src = char.imageUrl;
    const chk = item.querySelector("input");
    chk.setAttribute("id", `target-${id}`);
    chk.value = id;
    // add checbox event
    chk.addEventListener("change", () => {
      addPlayerTarget(chk);
    });
    listCharacters.append(item);
  });
}

// get player api details
function getCharDetails(id) {
  return (currentPlayerDetails = characters.find((x) => x.id == id));
}
// get current player base data
function getCurrentPlayerData(id) {
  return players.find((x) => x.id == id);
}
// get current player targets
function getCurrentPlayerTargets(id) {
  return getCurrentPlayerData(id).targets;
}

function addPlayerTarget(chk) {
  // current player tragets
  const playerTargets = getCurrentPlayerTargets(currentPlayerID);

  // add or remove player
  if (chk.checked) {
    // add to current player targets
    playerTargets.unshift({
      id: chk.value,
      done: false,
    });
    chk.closest("li").style.opacity = 0.5;
  } else {
    // remove from current player targets (note this list only includes targets NOT already included)
    playerTargets.forEach((target, key) => {
      if (target.id === chk.value) {
        delete playerTargets[key];
      }
    });
    chk.closest("li").style.opacity = 1;
  }
  // reload player targets and stats
  loadPlayerTargets(playerTargets);
}

// ACCOUNTS
const accounts = document.querySelector("#accounts");
const btnAccounts = document.querySelector("#bt-account");
const btnAccountsIcon = btnAccounts.querySelector("span");
const tplAccounts = document.querySelector("#tpl-accounts");
const btbCloseAccounts = accounts.querySelector("#btn-close-accounts");

// load list of cuurent players
function loadPlayers() {
  // list of current players
  players.forEach((player) => {
    const playerID = player.id;

    const playerDetails = characters.find((x) => x.id == playerID);
    const item = tplAccounts.content.cloneNode(true);
    item.querySelector("[account-name]").innerText = playerDetails.fullName;
    item.querySelector("img").src = playerDetails.imageUrl;

    // add button event
    item.querySelector("button").addEventListener("click", () => {
      currentPlayerID = playerDetails.id;
      // load new user data
      renderPlayerData();
      closeAccountsList();
    });
    accounts.append(item);
  });
}

let accountsVisible = false;
btnAccounts.addEventListener("click", () => {
  if (!accountsVisible) {
    btnAccountsIcon.style.transform = "rotate(180deg)";
    accounts.style.transform = "translateY(0)";
    accountsVisible = true;
  } else {
    closeAccountsList();
  }
});
btbCloseAccounts.addEventListener("click", () => closeAccountsList());

function closeAccountsList() {
  btnAccountsIcon.style.transform = "rotate(0)";
  accounts.style.transform = "translateY(-120%)";
  accountsVisible = false;
}

const btnLogin = document.querySelector("#btn-login");

document
  .querySelector("input[type=password]")
  .addEventListener("keyup", (event) => {
    if (event.target.value.length > 3) btnLogin.disabled = false;
    else btnLogin.disabled = true;
  });
// nav buttons
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  showPanel("profile");
});
document.querySelector("#btn-logout").addEventListener("click", (event) => {
  showPanel("login");
});

document.querySelector("#btn-profile").addEventListener("click", (event) => {
  showPanel("profile");
});

document.querySelector("#btn-targets").addEventListener("click", (event) => {
  showPanel("targets");
});

document
  .querySelector("#btn-targets-list")
  .addEventListener("click", (event) => {
    showPanel("targets");
  });

document
  .querySelector("#btn-targets-done")
  .addEventListener("click", (event) => {
    showPanel("targets");
  });
document
  .querySelector("#btn-new-targets")
  .addEventListener("click", (event) => {
    showPanel("characters");
  });
function showPanel(panelID) {
  //console.log(panelID);
  const panel = document.querySelector(`#panel-${panelID}`);

  panel.scrollIntoView({ behavior: "smooth", inline: "start" });
}

// retrieve characters from api
window.addEventListener("load", (event) => {
  (async function getData() {
    try {
      const response = await fetch(URL_API);
      characters = await response.json();
     // console.log(characters);
      renderPlayerData();
      listAlChars();
      loadPlayers();
    } catch (error) {
      console.log(error);
    }
  })();
});


// utility - prevent link clicks
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href") == "#") {
      e.preventDefault();
    }
  });
});
