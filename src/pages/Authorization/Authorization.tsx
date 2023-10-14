import { useEffect, useState } from 'react';
import './authorization.scss'
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { login } from '../../store/authReducer';
import { useSelector } from 'react-redux';

type FormData = {
  username: string;
  password: string;
};

export const Authorization: React.FC = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [])

  const [formData, setFormData] = useState<FormData>({
    username: 'kminchelle',
    password: '0lelplR',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [authError, setAuthError] = useState<string | null>();


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

    // if (formData.password && formData.username && formData.username !== 'vniir') {
    //   setAuthError('Пользователь не найден')
    // }

    // if (formData.password && formData.username && formData.username === 'vniir' && formData.password !== '12345') {
    //   setAuthError('Неверный пароль')
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && !authError) {
      setAuthError(null)
      console.log(formData);
      dispatch(login(formData.username, formData.password))
      navigate('/')

    }
  };

  return (
    <section className='authorization'>

      <div className='left'>
        <h2>Авторизация</h2>
        <p>Добро пожаловать! Введите свои данные для входа в систему</p>
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
              {authError && <p >{authError}</p>}
          </div>
        </div>

      </form>
      </div>
    </section>
  );
};