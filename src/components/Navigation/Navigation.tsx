import { useNavigate } from 'react-router-dom';
import './styles.scss'
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/authReducer';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import localStorageService from '../../services/localStorage.service';
import { getUser, getUserById } from '../../store/userReducer';

export function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const userId =localStorageService.getUserId()
  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(Number(userId)))
    }
  }, [dispatch, userId, isLogout]);

  const user = useSelector(getUser());
  const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

  const handleDrawerClose = () => {
		setOpen(false);
	};

  function handleLogout( ) {
    setIsLogout(true)
    localStorageService.removeAuthData()
    dispatch(logout());
    navigate('/auth')
    setOpen(false);
  }

  return (
    <nav className='navigation'>
      <button className='mobile__open-menu' onClick={handleDrawerOpen}>
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className='desktop-nav'>
        <button className='text-btn'>Главная</button>
        <button className='text-btn' onClick={() => navigate('/posts')}>Посты</button>
      </div>

    {user &&
      <div className='profile-nav-section desktop-nav'>
        <button className='text-btn' onClick={() => navigate('/profile')}>{user.firstName} {user.lastName[0]}.</button>
        <img className='profile-pic' src={user.image} alt="profile" />
        <button className='text-btn' onClick={handleLogout}>Выйти</button>
      </div>
    }

    <div className={open ? 'mobile__nav' : 'hide' }>
      <button onClick={handleDrawerClose}>
        <svg width="45px" height="45px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8L8 16M8 8L16 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className=''>
          <button className='text-btn'>Главная</button>
          <button className='text-btn' onClick={() => {setOpen(false); navigate('/posts')}}>Посты</button>
        </div>

      {user &&
        <div className=''>
          <button className='text-btn' onClick={() => {setOpen(false); navigate('/profile')}}> Профиль</button>
          <button className='text-btn' onClick={handleLogout}>Выйти</button>
        </div>
      }
    </div>
  </nav>
  )
}