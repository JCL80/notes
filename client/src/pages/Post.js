import React , {useEffect , useState , useContext } from 'react'
import { useParams} from "react-router-dom"
import axios from 'axios'
import { AuthContext } from "../helpers/AuthContext"

function Post() {
    let { id } = useParams()  
    const [post , setPost] = useState({})
    const [comments , setComments] = useState([])
    const [newComment , setNewComment] = useState("")
    const { authState} = useContext(AuthContext)
    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
           setPost(response.data)
        })
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
           setComments(response.data)
        })
    } , [])

    const addComment = () => {
        axios.post("http://localhost:3001/comments" , {
            CommentBody: newComment, 
            PostId : id ,
        },
        {
            headers:{
                accessToken : localStorage.getItem("accessToken")
            },
        }
        ).then(
            (response) => {
                if(response.data.error){
                }
                else{
                    const commentToAdd = {CommentBody : response.data.CommentBody , username:response.data.username , id : response.data.id} 
                    setComments([...comments , commentToAdd])
                    setNewComment("")
                }
            }
        )
    }
    
    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}` , {
            headers: { accessToken: localStorage.getItem("accessToken")},
        }).then(() => {
            setComments(comments.filter((val) => {
                return val.id != id
            }))
        })  
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className="post" id = "individual">
                    <div className='title'> {post.title}  </div>
                    <div className='body'> {post.postText} </div>
                    <div className='footer'> {post.username} </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type = "text" placeholder='Comment'
                    autoComplete='off' onChange={(event) => {
                        setNewComment(event.target.value)
                    }}
                    value = {newComment}
                    />
                    <button onClick={addComment}> Add Comment </button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment , key) => {
                        console.log(comment)
                          return (
                            <>
                                <div key = {key} className='comment'> {comment.CommentBody}  
                                    <label> Username : {comment.username} </label>
                                    { authState.username === comment.username && <button onClick={() => {
                                        deleteComment(comment.id);
                                    }}>X</button>}
                    
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
