import React from 'react';

const Employer = ({data}) => {
  const {id, name, performance, last_vacation_date, salary, pool_name} = data;
  const poolNameBlock = !pool_name ? null : <h2>{ pool_name }</h2>
  const employersClasses = `employer ${ pool_name ? 'rm': '' }`;
  return (
    <div className={ employersClasses } >
      { poolNameBlock }
      <div className='info'>
        <h3>id: { id } - { name }</h3>
        <p>salary: { salary }</p>
        <p>performance: { performance }</p>
        <p>last vacation date: { last_vacation_date }</p>
      </div>
    </div>
  );

}

export default Employer;