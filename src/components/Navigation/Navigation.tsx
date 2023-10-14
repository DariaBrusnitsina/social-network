import { useNavigate } from 'react-router-dom';
import './styles.scss'
import { RootState, useAppDispatch } from '../../store/store';
import { logout } from '../../store/authReducer';
import { useSelector } from 'react-redux';

export function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {user} = useSelector((state: RootState) => state.auth)


  function handleLogout( ) {
    dispatch(logout());
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
      <button className='text-btn' onClick={() => navigate('/profile')}>{user.firstName} {user.lastName[0]}.</button>
        <img className='profile-pic' src={user.image} alt="profile" />
        <button className='text-btn' onClick={handleLogout}>Выйти</button>
      </div>
    </nav>
  )
}