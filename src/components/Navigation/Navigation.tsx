import './styles.scss'

export function Navigation() {
  return (
    <nav className='navigation'>

      <div>
        <button className='text-btn'>Главная</button>
        <button className='text-btn'>Посты</button>
        <button className='text-btn'>Контакты</button>
        <button className='text-btn'>О нас</button>
      </div>

      <div className='profile-nav-section'>
      <button className='text-btn'>Name N.</button>
        <img className='profile-pic' src="https://robohash.org/hicveldicta.png" alt="profile" />
        <button className='text-btn'>Выйти</button>
      </div>

    </nav>
  )
}