import {combineReducers, createStore} from "redux";
import {reduser} from "./reducer";

const rootRreducer = combineReducers({
    cars: reduser,
})

export type AppRootState = ReturnType<typeof rootRreducer>

export const store = createStore(rootRreducer);