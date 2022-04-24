const cors = require("cors");
const express = require("express");
const server = express();
const { serverPort } = require("./config");
const { checkVkSign, savedb, getRandSym, getGameModel } = require("./util");
const db = require("./database.json");

server.use(express.json());

server.use(
  cors({
    origin: "*",
  })
);

server.listen(serverPort, null, () => console.log("Server is on"));

server.post("/api.php", (req, res) => {
  const data = req.body;
  console.log(data);
  const signValue = checkVkSign(data.authData);
  if (signValue) {
    if (data.method == "createGame") {
      const roomIndex = db.games.findIndex(
        (v) => v.gameOwner == data.authData.vkId
      );
      if (roomIndex != -1) {
        db.games.splice(roomIndex, roomIndex + 1);
      }
      if (!data.payload.playerCount) {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Для создании комнаты надо указать количество игроков",
        });
      }
      const gameModel = getGameModel(data.payload.playerCount);
      const hash = getRandSym(10);
      db.games.push({
        gameHash: hash,
        gameSettings: gameModel,
        playersId: [data.authData.vkId],
        gameOwner: data.authData.vkId,
      });
      savedb(db);
      return res.send({
        status: true,
        gameData: {
          gameHash: hash,
          gameSettings: gameModel,
          playersId: [data.authData.vkId],
          gameOwner: data.authData.vkId,
        },
      });
    }
    if (data.method == "joinGame") {
      const room = db.games.find((v) => v.gameHash == data.payload.hash);
      if (!room) {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Комнаты не существует",
        });
      }
      if (room.playersId.length < room.gameSettings.playerCount) {
        // ok, connect
        if (!room.playersId.includes(data.authData.vkId)) {
          room.playersId.push(data.authData.vkId);
          savedb(db);
        }
        return res.send({
          status: true,
          gameData: room,
        });
      } else {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "В комнате больше нет мест",
        });
      }
    }
    if (data.method == "startGame") {
      const room = db.games.find((v) => v.gameOwner == data.authData.vkId);
      if (room.gameSettings.inGame) {
        // alredy
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Игра уже начата",
        });
      } else {
        if (room.playersId.length == room.gameSettings.playerCount) {
          room.gameSettings.inGame = true;
          savedb(db);
          return res.send({
            status: true,
            gameData: room,
          });
        } else {
          return res.send({
            status: false,
            deadConnection: false,
            errorText: "Не все игроки зашли",
          });
        }
      }
    }
    if (data.method == "deleteGame") {
      const roomIndex = db.games.findIndex(
        (v) => v.gameOwner == data.authData.vkId
      );
      if (roomIndex != -1) {
        db.games.splice(roomIndex, roomIndex + 1);
        savedb(db);
        return res.send({
          status: true,
        });
      } else {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Комнаты не существует",
        });
      }
    }
    if (data.method == "gameInfo") {
      const room = db.games.find((v) => v.gameHash == data.payload.hash);
      if (!room || !room.playersId.includes(data.authData.vkId)) {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Комнаты не существует",
        });
      }
      if (room && room.playersId.includes(data.authData.vkId)) {
        return res.send({
          status: true,
          gameData: room,
        });
      }
    }
    if (data.method == "exitGame") {
      const room = db.games.find((v) => v.gameHash == data.payload.hash);
      if (!room || !room.playersId.includes(data.authData.vkId)) {
        return res.send({
          status: false,
          deadConnection: false,
          errorText: "Комнаты не существует",
        });
      }
      if (room && room.playersId.includes(data.authData.vkId)) {
        if (room.gameSettings.inGame && room.gameSettings.time > 0) {
          return res.send({
            status: false,
            deadConnection: false,
            errorText: "Вы не можете выйти находясь в игре",
          });
        }
        const playerId = room.playersId.indexOf(data.authData.vkId);
        room.playersId.splice(playerId, playerId + 1);
        savedb(db);
        return res.send({
          status: true,
          gameData: room,
        });
      }
    }
  } else {
    res.send({
      status: false,
      deadConnection: true,
      errorText: "Невалидная подпись",
    });
  }
  res.send({ status: true, defaultResponse: true });
});

const updateTime = () => {
  setInterval(async () => {
    if (db.games.length > 0) {
      for (let i in db.games) {
        const data = db.games[i];
        if (data.gameSettings.inGame && data.gameSettings.time > 0) {
          data.gameSettings.time -= 1;
          savedb(db);
        }
      }
    }
  }, 1000);
};

updateTime();
