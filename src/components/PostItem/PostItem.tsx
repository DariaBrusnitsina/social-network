import { useNavigate } from "react-router-dom";
import { IPost } from "../../types";
import './styles.scss'

interface Props {
  post: IPost;
}

export function PostItem({post}: Props) {
  const navigate = useNavigate()

  return (
    <div className="post__container">

      <div className="row post_title">
        <button className="text-btn" onClick={() => navigate(`/posts/${post.id}`, {replace: true})}>{post.title}</button>
        <p>{`userID: ${post.userId}`}</p>
      </div>

      <p>{post.body}</p>

      <div className="row">
      <div className="tags">
        {post.tags.map(t => <p key={t}>#{t}</p>)}
      </div>
          <button className="reaction-btn">
          <p>{post.reactions}</p>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
          </button>
      </div>
    </div>

  )
}