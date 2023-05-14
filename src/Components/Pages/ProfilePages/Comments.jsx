import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { FaCommentDots, FaLocationArrow, FaPen } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid';
import "./../style/comments.css"
import { useDispatch, useSelector } from 'react-redux';
import { Comment } from '../../Redux/Toolkit Action/postAction';

const Comments = ({postId , userPostId}) => {
    const userId = JSON.parse(localStorage.getItem('loginUser'))
    const [isShow, setisShow] = useState(false)
    const user = useSelector(state => state.user.user) 
    const userData = user?.find(x => x.id == userId)
    let post = useSelector(state => state.post.post)
    let postData = post?.find(x => x.id == postId)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const blanckObj = {id : 0 , comment : '' , userId : 0 , postId : 0 , email : ''}
    const [obj, setobj] = useState({...blanckObj})

    const commentData = (e) => {
        obj.comment = e.target.value
        if(e.target.value != ""){
            setisShow(true)
        }
        else{
            setisShow(false)
        }
        setobj({...obj})
    }

    const addComment = () => {
        if(obj.id == 0){
            let c1 = uuidv4();
            obj.id = c1;
            obj.userId = userId
            obj.postId = postId
            obj.email = userData.email
            let postObj = post?.find(x => x.id == obj.postId)
            let data = {...postObj}
            'comment' in data == true ? data.comment = [...data.comment , obj] : data.comment = [obj]
            dispatch(Comment(data))
        }
        else{
            let postObj = post?.find(x => x.id == obj.postId)
            let update = postObj.comment?.findIndex(x => x.id == obj.id)
            let data = [...postObj.comment]
            data.splice(update , 1 ,obj)
            let updatePost = {...postObj}
            updatePost.comment = data;
            dispatch(Comment(updatePost))
        }
        setobj({...blanckObj})
        setisShow(false)
    }

    const editComment = (x) => {
        setobj({...x})
    }

    const deleteComment = (x) => {
        let postObj = post?.find(e => e.id == x.postId)
        let update = postObj.comment?.findIndex(e => e.id == x.id)
        let data = [...postObj.comment]
        data.splice(update , 1)
        let deleteComment = {...postObj}
        deleteComment.comment = data
        dispatch(Comment(deleteComment))
    }

  return (
    <>
        <FaCommentDots className='me-3' style={{cursor : 'pointer'}} onClick={() => setShow(true)}/>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <input onChange={commentData} value={obj.comment} type="text" className='commentinput' name='comment' placeholder='Add Your Comment' style={{ width : '95%' , border : 'none' , borderBottom : '0.5px solid gray'}}/> {isShow == true ? <FaLocationArrow style={{cursor : 'pointer'}} className='text-primary' onClick={addComment}/> : <></>}
                </div>
                <div>
                    <dl>
                        {
                            postData?.comment?.map((x,i) => {
                                return x.userId == userId ? 
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment} <span><MdDelete style={{color : 'red' , cursor : 'pointer'}} className='fs-3' onClick={() => deleteComment(x)}/> <FaPen style={{cursor : 'pointer'}} onClick={() => editComment(x)} className='fs-5 text-success' /></span></dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div> :
                                x.postId == userPostId ? 
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment} <MdDelete style={{color : 'red' , cursor : 'pointer'}} className='fs-3' onClick={() => deleteComment(x)}/></dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div> :
                                <div key={i}>
                                    <dt className='d-flex justify-content-between align-items-center fw-semibold text-dark'>{x.comment}</dt>
                                    <dd className='text-end border-bottom text-muted'>-{x.email}</dd>
                                </div>
                            })
                        }
                    </dl>
                </div>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Comments