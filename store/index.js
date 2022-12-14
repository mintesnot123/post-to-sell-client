import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";
import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";
import productReducer from "./reducers/product";
import bannerReducer from "./reducers/banner";

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  auth: authReducer,
  profile: profileReducer,
  product: productReducer,
  banner: bannerReducer,
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "postToSell",
      whitelist: ["cart", "user", "auth", "profile"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
