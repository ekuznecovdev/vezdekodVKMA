const fs = require("fs");
const crypto = require("crypto");
const {
  appData: { appId, secret },
} = require("./config");
const path = require("path");

const checkVkSign = ({ vkSign, vkId, timestamp }) => {
  let sign;
  const queryParams = [];

  const processQueryParam = (key, value) => {
    if (typeof value === "string") {
      if (key === "sign") {
        sign = value;
      } else if (key.startsWith("vk_")) {
        queryParams.push({ key, value });
      }
    }
  };

  if (typeof vkSign === "string") {
    const formattedSearch = vkSign.startsWith("?") ? vkSign.slice(1) : vkSign;

    for (const param of formattedSearch.split("&")) {
      const [key, value] = param.split("=");
      processQueryParam(key, value);
    }
  } else {
    for (const key of Object.keys(vkSign)) {
      const value = vkSign[key];
      processQueryParam(key, value);
    }
  }

  if (!sign || queryParams.length === 0) {
    return false;
  }

  const queryString = queryParams

    .sort((a, b) => a.key.localeCompare(b.key))

    .reduce((acc, { key, value }, idx) => {
      return (
        acc + (idx === 0 ? "" : "&") + `${key}=${encodeURIComponent(value)}`
      );
    }, "");

  const paramsHash = crypto
    .createHmac("sha256", secret)
    .update(queryString)
    .digest()
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=$/, "");

  const appid = queryParams.find((v, i) => v.key == "vk_app_id");
  const userid = queryParams.find((v, i) => v.key == "vk_user_id");

  return paramsHash == sign && appid.value == appId && userid.value == vkId;
};

const getRandNum = (min, max, exist) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = null;
  while (!num || num == exist) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
};

const getGameModel = (players) => {
  const spyCount = 1;
  const spyPlayerId = getRandNum(1, players);
  const secondSpyPlayerId = getRandNum(1, players, spyPlayerId);
  const location = getRandNum(0, 5);
  let spyArr = [spyPlayerId];
  console.log(spyArr);
  if (players >= 9) {
    spyArr.push(secondSpyPlayerId);
  }
  return {
    playerCount: players,
    spyCount: spyCount,
    spyPlayerId: spyArr,
    time: Math.trunc(players * 60),
    location: location,
    inGame: false,
    showSpies: false,
    round: 1,
  };
};

const savedb = async (newDb) => {
  fs.writeFileSync(
    path.join(__dirname, "./database.json"),
    JSON.stringify(newDb),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getRandSym = (len) => {
  const dict = "qwertyuioplkjhgfdsazxcvbnm";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += dict[Math.trunc(Math.random() * dict.length)];
  }
  return str;
};

module.exports = { checkVkSign, getRandNum, getGameModel, savedb, getRandSym };
