import { useLocation } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { IComment, IPost, IUser } from "../../types";
import { useEffect, useState } from "react";
import { PostItem } from "../../components/PostItem/PostItem";
import './styles.scss'

export function Post() {
  const location = useLocation()
  const postId = location.pathname.split("/")[2]
  const [post, setPost] = useState<undefined | IPost>()
  const [comments, setComments] = useState<undefined | IComment[]>()
  const [user, setUser] = useState<undefined | IUser>()


  async function getData (){
    fetch(`https://dummyjson.com/posts/${postId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setPost(data)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  async function getUser (){
    fetch(`https://dummyjson.com/users/${post?.userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setUser(data)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  async function getComments (){
    fetch(`https://dummyjson.com/posts/${postId}/comments`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setComments(data.comments)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  useEffect(() => {
    getData()
    getComments()

    if (post !== undefined) {
      getUser()
    }

  }, [])


  console.log(user)


  return (
    <section className="container">
      <Navigation/>

      <div className="post-and-comments__container">
        {user !== undefined && <h2>Post by {user.firstName} {user.lastName}</h2>}
        {post !== undefined && <PostItem post={post} />}
        <div>
          <h3>Комментарии</h3>
          {comments !== undefined && comments.map(m =>
          <div className="comment__container">
            <h5>{m.user.username}</h5>

            <p>{m.body}</p>
          </div>)}
          <h4>Оставить комментарий</h4>
          <div>
          <textarea name="text" id="" cols={50} rows={5}></textarea>
          </div>
          <button className="comment-btn">Отправить</button>
        </div>
      </div>

    </section>
  )
}