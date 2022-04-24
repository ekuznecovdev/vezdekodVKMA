// ? libs import
import { createRoot } from "react-dom/client";
import { store } from "./lib/redux";
import { Provider } from "react-redux";
import bridge from "@vkontakte/vk-bridge";

// ? JSX import
import { App } from "./App";
import { ConfigProvider } from "@vkontakte/vkui";

bridge.send("VKWebAppInit");
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConfigProvider appearance="dark">
      <App />
    </ConfigProvider>
  </Provider>
);
