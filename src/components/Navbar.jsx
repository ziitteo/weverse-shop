import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Navbar = props => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const mobileMenu = useRef(null);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/');
  };

  const getSearchProduct = () => {
    props.setSearch(inputValue);
    const searchquery = inputValue === '' ? '' : `?q=${inputValue}`;
    navigate(`/search${searchquery}`);
    setInputValue('');
  };

  const activeEnter = e => {
    e.key === 'Enter' && getSearchProduct();
  };

  const toggleMobileMenu = () => {
    mobileMenu.current.classList.toggle('show');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='navbar-container'>
        <div className='navbar'>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className='login-button'
            role='button'
            tabIndex={0}
            onClick={props.authenticate ? () => props.setAuthenticate(false) : goToLogin}
          >
            <FontAwesomeIcon icon={faUser} />
            <div>{props.authenticate ? '로그아웃' : '로그인'}</div>
          </div>
          <div className='nav-info'>
            <div className='button-wrap'>
              {isMobile && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div className='toggle-button' role='button' tabIndex={0} onClick={toggleMobileMenu}>
                  <span className='toggle-icon'></span>
                  <span className='toggle-icon'></span>
                  <span className='toggle-icon'></span>
                </div>
              )}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div role='button' tabIndex={0} onClick={goToHome}>
                <img src={logo} alt='weverse logo' className='logo' />
              </div>
            </div>
            <ul className='nav-list'>
              <li className='list-item '>카트</li>
              <li className='list-item my-page'>
                <button>MY</button>
              </li>
              <li className='list-item'>공지사항</li>
              <li className='list-item'>이벤트</li>
              <li className='list-item'>고객센터</li>
            </ul>
            {isMobile && (
              <>
                {' '}
                <div className='mobile-nav' ref={mobileMenu}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <div className='toggle-button' role='button' tabIndex={0} onClick={toggleMobileMenu}>
                    <span className='toggle-icon'></span>
                    <span className='toggle-icon line'></span>
                  </div>
                  <ul className='mobile-nav-list'>
                    <li>
                      <li className='list-item'>공지사항</li>
                      <li className='list-item'>이벤트</li>
                      <li className='list-item'>고객센터</li>
                    </li>
                  </ul>
                </div>
                <div className='cart'></div>
              </>
            )}
          </div>
          <div className='menu-area'>
            <div className='search-wrap'>
              <input
                type='text'
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown={e => activeEnter(e)}
              />
              <FontAwesomeIcon icon={faSearch} className='search-button' onClick={getSearchProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
