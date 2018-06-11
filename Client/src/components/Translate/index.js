import { createStore } from "redux";
import reducers from "../../reducers";

import vi from "./vi.json";
import en from "./en.json";

const language = {
  vi,
  en
};

const translate = (key, template) => {
  const store = createStore(reducers);
  const lang = store.getState().user.lang;

  // lang = !lang ? store.getState().user.lang : lang;
  const values = language[lang];
  const text = values[key];
  if (!template) return values[key] ? text : key;
  return template.map((t, i) => text.replace(new RegExp(`{{ ${i} }}`, "g"), t));
};

export default translate;
