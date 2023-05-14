import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../../Redux/Toolkit Action/postAction'

const Like = (props) => {
    const userId = JSON.parse(localStorage.getItem('loginUser'))
    const post = useSelector(state => state.post.post)
    const postdata = post?.find(x => x.id == props.postId)
    const [showLike, setshowLike] = useState(props?.like?.includes(userId) ? true : false)
    const dispatch = useDispatch()
    
    const like = () => {
        let data = {...postdata}
        if(!showLike){
            // data.like.push(userId)
            data.like = [...data.like , userId]
            setshowLike(true)
        }
        else{
            let likeary = data.like?.filter(x => x != userId)
            data.like = likeary
            setshowLike(false)
        }
        dispatch(addLike(data))
    }
  return (
    <>
        <FaHeart className='like' style={showLike == true ? {color : 'red'} : {color : 'black'}} onClick={like}/> <span className='me-3 ms-1'>{postdata?.like?.length}</span>
    </>
  )
}

export default Like