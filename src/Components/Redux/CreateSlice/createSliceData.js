import { createSlice } from "@reduxjs/toolkit";

export const userDataReducer = createSlice({
    name : 'user',
    initialState : {
        user : []
    },
    reducers : {
        getUser(state , action){
            return {
                ...state,
                user : action.payload
            }
        }
    }
})

export const postReducer = createSlice({
    name : 'post',
    initialState : {
        post : []
    },
    reducers : {
        getPost(state , action){
            return {
                ...state,
                post : action.payload
            }
        }
    }
})

export const { getUser } = userDataReducer.actions
export const { getPost } = postReducer.actions