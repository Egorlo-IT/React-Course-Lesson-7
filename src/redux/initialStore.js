import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { cacheReduser } from "./reducers/cacheReduser";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persisterReducer = persistReducer(persistConfig, cacheReduser);

const middleware = (store) => (next) => (action) => {
  if (action.type === "addMessage" && action.payload.author !== "Robot") {
    setTimeout(() => {
      store.dispatch({
        type: "addMessage",
        payload: {
          id: action.calcId("mess") + 1,
          author: "Robot",
          text: `Привет, ${action.payload.author}!`,
          chatId: store.getState().currentChatID,
        },
      });
      action.setProgress(false);
    }, 1500);
  }
  return next(action);
};

const logger = createLogger({ collapsed: true, diff: true, predicate: true });

export const store = createStore(
  persisterReducer,
  composeWithDevTools(applyMiddleware(middleware, logger))
);
export const persister = persistStore(store);
