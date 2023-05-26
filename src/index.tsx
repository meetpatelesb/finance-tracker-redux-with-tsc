import Reactdom from "react-dom";
import App from "./App";
import "./index.css";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

// jsx
Reactdom.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
