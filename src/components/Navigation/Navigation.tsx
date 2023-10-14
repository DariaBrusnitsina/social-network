import { useNavigate } from 'react-router-dom';
import './styles.scss'

export function Navigation() {
  const navigate = useNavigate();

  function handleLogout( ) {
    navigate('/auth')
  }

  return (
    <nav className='navigation'>

      <div>
        <button className='text-btn'>Главная</button>
        <button className='text-btn' onClick={() => navigate('/posts')}>Посты</button>
        <button className='text-btn'>Контакты</button>
        <button className='text-btn'>О нас</button>
      </div>

      <div className='profile-nav-section'>
      <button className='text-btn' onClick={() => navigate('/profile')}>Name N.</button>
        <img className='profile-pic' src="https://robohash.org/hicveldicta.png" alt="profile" />
        <button className='text-btn' onClick={handleLogout}>Выйти</button>
      </div>
    </nav>
  )
}