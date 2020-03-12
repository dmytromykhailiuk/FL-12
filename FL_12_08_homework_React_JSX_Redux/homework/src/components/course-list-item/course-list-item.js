import React, { Component } from 'react';
import './course.list-item.css';
import MenuBlock from '../menu-block';

const CourseListItemVue = ({
  deleteCourse, toggleMenu, date, title, description, id, duration, isMenuOpen
}) => {

  const menu = isMenuOpen ? 
               <MenuBlock id={id} deleteCourse={() => deleteCourse(id)} /> 
               : null;

  return (
    <li>
      <p className="course__data">{ date }</p>
      <p className="course__name">{ title }</p>
      <p className="course__desc">{ description }</p>
      <p className="course__duration">{ duration }</p>
      <button className="menu__btns" onClick={toggleMenu} >. . .</button>
      { menu }
    </li>
  );
}

const CourseListItemContainer = ({course, deleteCourse, toggleMenu}) => {
  const { date, title, description, id, duration, isMenuOpen} = course;

  const changeDurationType = (() => {
    let arr = duration.split(':');
    if (arr[1] === undefined) {
      return '';
    }
    return (`${arr[0]}h ${arr[1]}min`);
  })();

  const dateValue = (() => {
    if (date.split('-')[1] === undefined)  return '';
    return (`${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0].slice(2, 4)}`);
  })();

  return (
    <CourseListItemVue 
      date={dateValue} 
      duration={changeDurationType} 
      title={title} 
      description={description}
      id={id}
      isMenuOpen={isMenuOpen}
      deleteCourse={deleteCourse} 
      toggleMenu={toggleMenu} />
  );
};

export default CourseListItemContainer;