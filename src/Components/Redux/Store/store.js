import { applyMiddleware, combineReducers, createStore } from "redux";
import { rootReducer } from "../Reducer/rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { postReducer, userDataReducer } from "../CreateSlice/createSliceData";

// export const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// )

const reducers = combineReducers({
    user : userDataReducer.reducer,
    post : postReducer.reducer
})

export const store = configureStore({
    reducer : reducers
})