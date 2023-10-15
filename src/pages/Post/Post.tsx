import './styles.scss'
import { Navigate, useLocation } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { useEffect } from "react";
import { PostItem } from "../../components/PostItem/PostItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { getPostById } from "../../store/postsReducer";
import { getComments, getCommentsById, getCommentsLoadingStatus } from "../../store/commentsReducer";
import { getUser, getUserById, getUserLoadingStatus } from "../../store/userReducer";

export function Post() {
  const location = useLocation()
  const postId = Number(location.pathname.split("/")[2])

  const dispatch = useAppDispatch()

  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const post = useSelector(getPostById(postId))
  const comments = useSelector(getComments());
  const isLoadingComments = useSelector(getCommentsLoadingStatus())
  const user = useSelector(getUser());
  const isLoadingUser = useSelector(getUserLoadingStatus())

  useEffect(() => {
    dispatch(getCommentsById(postId))
    if (post?.userId != undefined) {
      dispatch(getUserById(post.userId))
    }
  }, [postId]);

  if (!isAuthenticated) {
    return <Navigate to="/auth"/>
  }

  return (
    <section className="container">
      <Navigation/>

       <div className="post-and-comments__container">
        {!isLoadingUser ? user && <h2>Post by {user.firstName} {user.lastName}</h2> : <p>Loading...</p>}
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