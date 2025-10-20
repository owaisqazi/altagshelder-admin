import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileReducer from "./profileslice"; // Assuming this handles user profile data
import usersReducer from "./userslice"; // Assuming this handles the user list
import ProductsReducer from "./productslice"; // Assuming this handles the user list

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile", "users", "products"], // Specify which reducers to persist
};

const rootReducer = {
  profile: persistReducer(persistConfig, profileReducer), // Persisted reducer
  users: usersReducer, // Regular reducer
  products: ProductsReducer, // Regular reducer
};

export const store = configureStore({
  reducer: rootReducer, // Combine persisted and non-persisted reducers
});

export const persistor = persistStore(store);
