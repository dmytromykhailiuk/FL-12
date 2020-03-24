import React from 'react';

const PoolInfo = ({data}) => {
  return (
    <div className='pool-info'>
      <div> Average Salary: { Math.floor(data.getSalary()) } </div>
      <div> Average Performance: { data.getPerformanse() } </div>
      <div> Average Last Vacation Date: { data.getLastVacationDate() } </div>
    </div>
  );
}

export default PoolInfo;