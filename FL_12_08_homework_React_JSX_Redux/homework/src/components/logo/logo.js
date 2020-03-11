import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Logo = () => {
  return(
    <div className='header-wraper'>
      <Link to="/">
        <img src={logo} alt='logo' />
        <p>LEARN</p>
      </Link>
    </div>
  );
}

export default Logo;