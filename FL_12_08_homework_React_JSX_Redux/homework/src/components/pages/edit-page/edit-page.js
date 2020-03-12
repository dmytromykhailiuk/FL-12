import React, { Component } from 'react';
import './edit-pade.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorIndicator from '../../error-indicator/';
import { saveChanging, onInputChange, changeCourse, clearFields } from '../../../actions';

const EditPage = ({
  itemId, saveChanging, onInputChange, title, description, duration, authors, date, renderLink, dateValue
}) => {

  return (
    <form>
      <div className='form__wraper'>
        <h2>{ itemId ? 'Edit course' : 'New course' }</h2>
        <label className='new__course__title'>
          <p>Title*</p>
          <input type="text" id="title" 
                 onChange={(e) => onInputChange('title', e.target.value)} 
                 value={title} />
        </label>
        <label className='new__course__desc'>
          <p>Description*</p>
          <textarea id="description"
                    onChange={(e) => onInputChange('description', e.target.value)} 
                    value={description}></textarea>
        </label>
        <div className='helping__inputs'>
          <div className='helping__inputs__wraper'>
            <label className='new__course__duration'>
              <p>Duration*</p>
              <input type="time" id="duration" 
                     onChange={(e) => onInputChange('duration', e.target.value)}
                     value={duration} />
            </label>
            <label className='new__course__authors'>
              <p>Authors*</p>
              <input type="text" id="authors"
                     onChange={(e) => onInputChange('authors', e.target.value)} 
                     value={authors} />
            </label>
          </div>
          <div className="calendar__wrap">
            <div>
              <p>Date*</p>
              <p className='prev__date'>{ dateValue }</p>
            </div>
            <input type='date' id='course__date__val'
                   onChange={(e) => onInputChange('date', e.target.value)} 
                   value={ date } />
          </div>
        </div>
        <div className='form__btns'>
          <Link to={renderLink ? "/" : window.location.pathname}> 
            <input
              type="submit"
              value="Submit" 
              className='btn-submit'
              onClick={() => saveChanging(itemId)} />
          </Link> 
          <Link to="/">
            <input type="button" value="Cancel" className='btn-cancel' />
          </Link>
        </div>
      </div>
    </form>
  );
};

class EditPageContainer extends Component {

  componentDidMount() {  
    if (this.props.itemId) {
      this.props.changeCourse(this.props.itemId);  
    } else {
      this.props.clearFields();
    }
  }

  render() {
    
    const {
      itemId, saveChanging, onInputChange, title, description, duration, authors, date, renderLink
    } = this.props;

    const dateValue = (() => {
      if (date.split('-')[1] === undefined)  return '';
      return (`${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0].slice(2, 4)}`);
    })();

    const isPageNotFound = itemId !== undefined && title === '';

    const error = <ErrorIndicator/>;
    const form = <EditPage itemId={itemId}
                          date={date}
                          dateValue={dateValue}
                          saveChanging={saveChanging}
                          onInputChange={onInputChange}
                          title={title}
                          description={description}
                          duration={duration}
                          authors={authors}
                          renderLink={renderLink} />

    return isPageNotFound ? error : form;
    
  };
};

const mapStateToProps = ({ title, description, duration, authors, date, renderLink }) => {
  return { title, description, duration, authors, date, renderLink };
};

const mapDispatchToProps = {
  saveChanging, onInputChange, changeCourse, clearFields
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPageContainer);