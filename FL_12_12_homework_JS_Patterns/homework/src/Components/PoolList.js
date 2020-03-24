import React from 'react';
import PoolInfo from './PoolInfo';
import Employees from './Employees';

const PoolList = ({data, withChild = null, withPoolInfo = null, onlyRM = null}) => {
  return (
    <ul>
      <h2> { data.pool_name } </h2>
      {  withPoolInfo ? <PoolInfo data={data} /> : null  }
      <li> <Employees info={data} /> </li>
      { 
        withChild ? data.children.map((el, key) => {
          if (el.pool_name) {
            return (
              <li key={key}>
                <PoolList  
                  data={el}
                  withChild={withChild}
                  withPoolInfo={withPoolInfo}
                  onlyRM={onlyRM}
                />
              </li>
            );
          } else {
            return onlyRM ? null : <li key={key}> <Employees info={el} /> </li>;
          }
        }) : null
      }    
    </ul>
  );
}

export default PoolList;