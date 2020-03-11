import React, { Component } from 'react';
import './course.list-item.css';
import MenuBlock from '../menu-block';

export default class CourseListItem extends Component {
  render() {
    const { date, title, description, id, duration, isMenuOpen} = this.props.course;

    const menu = isMenuOpen ? 
                 <MenuBlock id={id} deleteCourse={() => this.props.deleteCourse(id)} /> 
                 : null;

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
      <li>
        <p className="course__data">{ dateValue }</p>
        <p className="course__name">{ title }</p>
        <p className="course__desc">{ description }</p>
        <p className="course__duration">{ changeDurationType }</p>
        <button className="menu__btns" onClick={this.props.toggleMenu} >. . .</button>
        { menu }
      </li>
    );
  }
}
