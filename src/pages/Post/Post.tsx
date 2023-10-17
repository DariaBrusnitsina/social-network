import './styles.scss'
import { Navigate, useLocation } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { PostItem } from "../../components/PostItem/PostItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { getPostById } from "../../store/postsReducer";
import { getComments, getCommentsById, getCommentsLoadingStatus } from "../../store/commentsReducer";
import axios from 'axios';
import { IUser } from '../../types';

export function Post() {
  const location = useLocation()
  const postId = Number(location.pathname.split("/")[2])
  const dispatch = useAppDispatch()
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const post = useSelector(getPostById(postId))
  const comments = useSelector(getComments());
  const isLoadingComments = useSelector(getCommentsLoadingStatus())
  const [userData, setUserData] = useState<IUser | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${post?.userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
      }
    }

    if (post?.userId !== undefined) {
      fetchUserData()
    }

  }, [post?.userId]);

  useEffect(() => {
    dispatch(getCommentsById(postId))
  }, [dispatch, postId]);


  if (!isAuthenticated) {
    return <Navigate to="/auth"/>
  }

  return (
    <section className="container">
      <Navigation/>

       <div className="post-and-comments__container">
        {userData !== null ? <h2>Post by {userData.firstName} {userData.lastName}</h2> : <p>Loading...</p>}
        {post !== undefined && <PostItem post={post} />}
        {!isLoadingComments ? <div>
          <h3>Комментарии</h3>
          {comments && comments.map(m =>
          <div className="comment__container" key={m.id}>
            <h5>{m.user.username}</h5>

            <p>{m.body}</p>
          </div>)}
          <h4>Оставить комментарий</h4>
          <div>
          <textarea name="text" id=""  rows={5}></textarea>
          </div>
          <button className="comment-btn">Отправить</button>
        </div> : <p>Loading...</p>}
      </div>

    </section>
  )
}