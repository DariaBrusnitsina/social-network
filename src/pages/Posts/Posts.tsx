import { useEffect, useState } from 'react';
import { Navigation } from '../../components/Navigation/Navigation'
import './styles.scss'
import { PostsList } from '../../components/PostsList/PostsList';
import { IPost } from '../../types';

const tags = ["#history", "#american", "#crime", "#french", "#fiction", "#english", "#mystery", "#love", "#magical"]


export function Posts() {
  const [posts, setPosts] = useState<undefined | IPost[]>()

  async function getData (){
    fetch('https://dummyjson.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setPosts(data.posts)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className="container">
      <Navigation/>

      <div className="postslist-and-tags__wrapper">
          <div className='posts_postslist-container'>
            {posts !== undefined && <PostsList posts={posts} />}
          </div>

          <div className='posts_tags-container'>
            <h2>Tags</h2>
            <div className='tags__wrapper'>
              {tags.map(tag => <p>{tag}</p>)}
              </div>
          </div>
      </div>
    </section>
  )
}