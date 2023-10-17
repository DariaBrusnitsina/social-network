import './styles.scss'

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { getAuthErrors, login } from '../../store/authReducer';
import { useSelector } from 'react-redux';

type FormData = {
  username: string;
  password: string;
};

export function Authorization() {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const loginError = useSelector(getAuthErrors());

  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    username: 'kminchelle',
    password: '0lelplR',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.username) {
      newErrors.username = 'Введите логин';
    }
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login(formData.username, formData.password))
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/posts"/>
  }

  return (
    <section className='authorization'>

      <div className='left'>
        <h2>Авторизация</h2>
        <p className='welcome-text'>Добро пожаловать! Введите свои данные для входа в систему</p>
      <div className='column'>
        <button className='text-btn'>Регистрация</button>
        <button className='text-btn'>Забыли пароль?</button>
      </div>
      </div>

      <div className='rigth'>
      <form  onSubmit={handleSubmit}>
        <div>
          <label className='authorization-label'>Логин</label>
          <input
            className='authorization-input'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <div className='authorization-error'>
            {errors.username && <p >{errors.username}</p>}
          </div>
        </div>

        <div>
          <label className='authorization-label'>Пароль</label>
          <input
            className='authorization-input'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className='authorization-error'>
            {errors.password && <p >{errors.password}</p>}
          </div>
        </div>

        <div className='authorization-btn-container'>
          <button className="authorization-btn" type="submit">Войти</button>
          <div className='authorization-error'>
            {loginError && <p>{loginError}</p> }
          </div>
        </div>

      </form>
      </div>
    </section>
  );
}