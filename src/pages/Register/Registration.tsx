import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { registerUser } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';

interface FormData {
  nickname: string;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ nickname: '', email: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((error) => console.error('Registration error:', error));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="nickname">Nickname:</label>
          <input
            className={styles.input}
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className={styles.button} type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
