import { Navigation } from '../../components/Navigation/Navigation'
import './styles.scss'
import { PostsList } from '../../components/PostsList/PostsList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

const tags = ["#history", "#american", "#crime", "#french", "#fiction", "#english", "#mystery", "#love", "#magical"]

export function Posts() {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const posts = useSelector((state: RootState) => state.posts.entities)

  if (!isAuthenticated) {
    return <Navigate to="/auth"/>
  }

  return (
    <section className="container">
      <Navigation/>

      <div className="postslist-and-tags__wrapper">
          <div className='posts_postslist-container'>
            {posts !== null && <PostsList posts={posts} />}
          </div>

          <div className='posts_tags-container'>
            <h2>Tags</h2>
            <div className='tags__wrapper'>
              {tags.map(tag => <p key={tag}>{tag}</p>)}
              </div>
          </div>
      </div>
    </section>
  )
}