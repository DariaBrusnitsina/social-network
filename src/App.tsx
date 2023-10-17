import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Authorization } from './pages/Authorization/Authorization'
import { Posts } from './pages/Posts/Posts'
import { Profile } from './pages/Profile/Profile'
import { Post } from './pages/Post/Post'
import { useAppDispatch } from './store/store'
import { useEffect } from 'react'
import { getPosts } from './store/postsReducer'
import { getUserById } from './store/userReducer'
import localStorageService from './services/localStorage.service'

function Home() {
  return <Navigate to="posts"/>
  return (
    <></>
  )
}

function App() {
  const dispatch = useAppDispatch()
  const userId =localStorageService.getUserId()

  useEffect(() => {
    dispatch(getPosts())

    if (userId) {
      dispatch(getUserById(Number(userId)))
    }
  }, [dispatch, userId]);

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='auth' element={<Authorization />}/>
        <Route path='profile' element={<Profile />}/>

        <Route path="posts">
          <Route index element={<Posts />}/>
          <Route path=":itemId" element={<Post/>}/>
        </Route>

      </Routes>
  )
}

export default App
