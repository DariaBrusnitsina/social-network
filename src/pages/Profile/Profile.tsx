import './styles.scss'

import { useSelector } from "react-redux";
import { Navigation } from "../../components/Navigation/Navigation";
import { RootState, useAppDispatch } from "../../store/store";
import { Navigate } from "react-router-dom";
import { getCurrentUserId } from "../../store/authReducer";
import { getUser, getUserById } from "../../store/userReducer";
import { useEffect } from "react";

function formatDate(inputDate: string) {
  const months = [
    'января', 'февраля', 'марта', 'апреля',
    'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'
  ];

  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = months[parseInt(dateParts[1]) - 1];
  const day = parseInt(dateParts[2]);

  return `${day} ${month} ${year}`;
}


export function Profile() {
  const dispatch = useAppDispatch()

  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const userId = Number(useSelector(getCurrentUserId()))
  const user = useSelector(getUser());

  useEffect(() => {

      dispatch(getUserById(userId))

  }, [userId]);

  if (!isAuthenticated) {
    return <Navigate to="/auth"/>
  }

  return (
    <section className="container">
      <Navigation/>

      {user &&
      <div className="row profile_container">
        <div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p> {user.email}</p>
          <p>Дата рождения: {formatDate(user.birthDate)}</p>

        </div>

        <img className='profile-page_image' src={user.image} alt="profile" />
      </div>
      }
    </section>
  )
}