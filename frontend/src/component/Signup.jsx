// Signup.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/authAction';
import styles from '../styles/Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);
  const isAuthChecking = useSelector((state) => state.authReducer.isAuthenticated);
  const navigate = useNavigate();


  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(email, password, confirmPassword));
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if(isAuthChecking){
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
