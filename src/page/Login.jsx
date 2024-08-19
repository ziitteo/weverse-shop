import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';

const Login = ({ setAuthenticate }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = event => {
    event.preventDefault();
    setAuthenticate(true);
    navigate('/');
  };

  return (
    <div>
      <div className='login-container'>
        <div className='logo-container'>
          <img src={logo} alt='weverse account' />
        </div>
        <div className='login-form'>
          <h1>
            위버스 계정으로
            <br />
            로그인해주세요.
          </h1>
          <div className='form-wrap'>
            <form onSubmit={event => loginUser(event)}>
              <div className='email-input-wrap input-wrap'>
                <label htmlFor='email' className='input-label'>
                  이메일
                </label>
                <div className='input-group'>
                  <input
                    id='email'
                    type='text'
                    aria-required='true'
                    name='email'
                    placeholder='your@email.com'
                    className='input-style'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className='password-input-wrap input-wrap'>
                <label htmlFor='password' className='input-label'>
                  비밀번호
                </label>
                <div className='input-group'>
                  <input
                    id='password'
                    type='password'
                    aria-required='true'
                    name='password'
                    placeholder='비밀번호'
                    className='input-style'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <div className='login-button-wrap'>
                <button type='submit' className='login-button'>
                  <span className='button-text'>로그인</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
