import { ThunkAction, Action, configureStore} from '@reduxjs/toolkit';
import {userReducer} from "./slices/user";
import { createWrapper } from 'next-redux-wrapper';

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
        }
    })
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStore, unknown, Action<string>>

export const wrapper = createWrapper<RootStore>(makeStore);


