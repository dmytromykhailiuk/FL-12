import React from 'react';
import searchImg from '../../images/search.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onInputChange } from '../../actions';
import './nav.css';

const Nav = ({searchingVal, onInputChange}) => {
  return (
    <nav>
      <div className='input-wraper'>
        <label>
          <img src={searchImg} alt='search' />
          <input 
            type='text' 
            placeholder='Search' 
            onChange={(e) => onInputChange('searchingVal', e.target.value) } 
            value={searchingVal} />
        </label>
      </div>
      <Link to="/new-course">
        <button>Add course</button>
      </Link>
    </nav>
  );
};


const mapStateToProps = ({ searchingVal }) => {
  return { searchingVal };
};

const mapDispatchToProps = {
  onInputChange
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
