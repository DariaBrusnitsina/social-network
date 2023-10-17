import localStorageService from '../../services/localStorage.service';
import { IPost } from '../../types';
import './styles.scss'

import { useEffect, useState } from 'react';

interface FormData {
  title?: string;
  body?: string;
  tags?: string;
}

const initialState = {
  title: '',
  body: '',
  reactions: 0,
  tags: [],
  id: Math.floor(Math.random() * 100),
  userId: 0,
}

export const AddPostForm: React.FC = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const userId = localStorageService.getUserId()
  const [errors, setErrors] = useState<FormData>({});
  const [formData, setFormData] = useState<IPost>(initialState);

  useEffect(() => {
    if (userId) {
      setFormData({
        ...formData,
        userId: Number(userId),
      });
    }
  }, [userId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  };

  const handleTagAdd = () => {
    if (tag !== "") {
      tags.push(tag);
      setTags(tags);

      setFormData({
        ...formData,
        tags
      });
      setTag('')
    }
  };

  const validateForm = () => {
    const newErrors: FormData = {};
    if (!formData.title) {
      newErrors.title = 'Это поле не может быть пустым';
    }

    if (!formData.body) {
      newErrors.body = 'Это поле не может быть пустым';
    }

    if (formData.tags.length < 2) {
      newErrors.tags = 'Введите как минимум 2 тега';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData))
      setFormData(initialState)
      setTags([])
      setTag('');
    }
  };

  return (
    <>
    <button onClick={() => setOpenEditor(prev => !prev)}><h4>Создать новый пост</h4></button>
    <div className={!openEditor ? "add-post-container hide" : "add-post-container"}>

      <form onSubmit={handleSubmit}>
        <div className='add-post-form'>
          <label>Заголовок</label>
          <input
            className='add-post-input'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange} />
          <div className='authorization-error'>
            {errors.title && <p>{errors.title}</p>}
          </div>
        </div>

        <div className='add-post-form'>
          <label>Текст поста</label>
          <input
            className='add-post-input'
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange} />
          <div className='authorization-error'>
            {errors.body && <p>{errors.body}</p>}
          </div>
        </div>

        <div className='add-post-form'>
          <label>Теги</label>
          <div className="tags">
            {tags.map(t => <p key={t}>#{t}</p>)}
          </div>
          <div>

            <input
              className='add-post-input'
              type="text"
              name="tags"
              value={tag}
              onChange={handleChangeTags} />
            <button onClick={handleTagAdd} type="button">Добавить тег</button>


          <div className='authorization-error'>
            {errors.tags && <p>{errors.tags}</p>}
          </div>
          </div>

        </div>

        <div className=''>
          <button className="add-post-btn" type="submit">Отправить пост</button>
        </div>
      </form>
    </div></>
  );
};