import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Authorization } from './pages/Authorization/Authorization'
import { Posts } from './pages/Posts/Posts'

const isLoggedIn = true

function Home() {
  if (isLoggedIn) {
    return <Navigate to="/posts"/>
  } else {
    return <Navigate to="/auth"/>
  }

  return (
    <></>
  )
}

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Authorization />}/>
        <Route path='/profile' element={<Authorization />}/>

        <Route path="posts">
          <Route index element={<Posts />}/>
          {/* <Route path=":itemId" element={<ItemPage/>}/> */}
        </Route>

      </Routes>
  )
}

export default App
