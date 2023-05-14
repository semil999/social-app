import axios from "axios"
import { getPost } from "../CreateSlice/createSliceData"

export const getPostApi = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/post').then(res => {
            dispatch(getPost(res.data))
        })
    }
}

export const postDataAdd = (obj) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/post/' , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const postDataDelete = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3000/post/${id}`).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const addLike = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/post/${obj.id}` , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const Comment = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/post/${obj.id}` , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}

export const updatePost = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/post/${obj.id}` , obj).then(() => {
            dispatch(getPostApi())
        })
    }
}