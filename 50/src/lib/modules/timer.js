import { store } from "../redux";
import bridge from "@vkontakte/vk-bridge";

let work = false;
let time = 0;

const flash = async () => {
  const flashData = await bridge.send("VKWebAppFlashGetInfo");
  if (flashData.is_available == true) {
    await bridge.send("VKWebAppFlashSetLevel", { level: 1 });
    setTimeout(async () => {
      await bridge.send("VKWebAppFlashSetLevel", { level: 0 });
    }, 1000);
  }
};

const timeCount = () => {
  if (window.timer != null) {
    clearInterval(window.timer);
    window.timer = null;
  }
  if (time > 0 && work) {
    console.log("ttetefeefe");
    window.timer = setInterval(async () => {
      console.log("testset");
      if (time == 1) {
        await flash();
      }
      if (time <= 1) {
        await clearInterval(window.timer);
        window.timer = null;
        work = false;
        time = 0;
        await store.dispatch({
          type: "user/setTimerRest",
          payload: 0,
        });
        return;
      }
      time -= 1;
      await store.dispatch({
        type: "user/setTimerRest",
        payload: time,
      });
    }, 1000);
  } else {
    work = false;
    time = 0;
  }
  return;
};

export const timerAPI = {
  reset: () => {
    store.dispatch({
      type: "user/setTimerRest",
      payload: 0,
    });
    work = false;
    time = 0;
  },
  start: async (sec) => {
    work = true;
    time = sec;
    store.dispatch({
      type: "user/setTimerRest",
      payload: sec,
    });
    await timeCount();
  },
};
