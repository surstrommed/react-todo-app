import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import TodoReducer from "./slices/todoSlice";

const persistConfig = {
  key: "todoList",
  storage,
};

const rootReducer = combineReducers({
  todo: TodoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
