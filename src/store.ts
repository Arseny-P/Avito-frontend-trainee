import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { PostListSlice } from "./modules/UI/PostsList/PostList.slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const rootReducer = combineReducers({
  [PostListSlice.name]: PostListSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['postList'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});
export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>()