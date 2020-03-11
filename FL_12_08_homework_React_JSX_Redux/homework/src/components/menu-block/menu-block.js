import React from 'react';
import editIcon from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import { withRouter } from 'react-router-dom';

const MenuBlock = ({ history, id, deleteCourse }) => {

  return (
    <div className="menu__block">

        <button onClick={ () => history.push(`/courses/${id}`)}>
          <img src={editIcon} alt="edit icon" />
          Edit
        </button>
 
      <button onClick={deleteCourse}>
        <img src={deleteIcon} alt="delete icon" />
        Delete
      </button>
    </div> 
  );
}

export default withRouter(MenuBlock);