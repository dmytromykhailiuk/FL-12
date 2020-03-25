import React from "react";

export default class Employees extends React.Component {
  render() {
    const employersClasses = `employer ${ this.props.info.pool_name ? 'rm': '' }`;
    return (
      <div className={ employersClasses } >
        <div className='info'>
          <h3>id: { this.props.info.id } - { this.props.info.name }</h3>
          <p>salary: { this.props.info.salary }</p>
          <p>performance: { this.props.info.performance }</p>
          <p> 
            {
            this.props.info.last_vacation_date === undefined ? null :
              `last vacation date: ${this.props.info.last_vacation_date}`  
            } 
          </p>
        </div>
      </div>
    );
  }
}