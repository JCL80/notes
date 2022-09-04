import React from 'react'
import axios from 'axios';
import { useEffect , useState } from "react"
import { useNavigate } from "react-router-dom"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function Home() {
    const [listOfPosts , setListOfPosts ] = useState([])
    let navigate = useNavigate()
  
    useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data)
      })
    } , [])

    const likeAPost = (postId) =>{
      axios.post(
      "http://localhost:3001/likes" , 
      {PostId : postId} ,
      {headers: {accessToken : localStorage.getItem("accessToken")}}
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } if(!(response.data.liked)) {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
    }
  
    return (
      <div className="App">
        {listOfPosts.map((val , key) => {
          return (
            <div className='post'> 
              <div className='title'> {val.title} </div>
              <div className='body' onClick={() => navigate(`/post/${val.id}`)}> {val.postText} </div>
              <div className='footer'> 
                <div className='username'> {val.username} </div> 
                <div className='buttons'>
                  <ThumbUpAltIcon 
                      onClick={() => {likeAPost(val.id)}}
                      className = "likeBttn"
                  />
                  <ThumbUpAltIcon 
                      onClick={() => {likeAPost(val.id)}}
                      className = "unlikeBttn"
                  />
                  <label>{val.Likes.length}</label> 
                </div>

              </div>
            </div>
          )
        })}
      </div>
    );
}

export default Home
