import React from 'react';

const PoolInfo = ({data}) => {
  
  return (
    <div className='pool-info'>
      <div> Average Salary: { Math.floor(data.getInfo().salary) } </div>
      <div> Average Performance: { data.getInfo().performance } </div>
      <div> Average Last Vacation Date: { data.getInfo().last_vacation_date } </div>
    </div>
  );
}

export default PoolInfo;