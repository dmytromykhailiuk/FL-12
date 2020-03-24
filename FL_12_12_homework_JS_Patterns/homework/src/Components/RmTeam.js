import React from 'react';
import Employer from './Employer';

const RmTeam = ({rm, data, isRmOnly}) => {
  const rmId = rm.id;
  const team = [...data].filter(empl => empl.rm_id === rmId);
  
  return (
    <ul>
      <li><Employer data={rm} /></li>
      
      {
        team.map(empl => {
          if (!empl.pool_name) {
            return (
              isRmOnly ? null : 
                <li key={empl.id}>
                  <Employer data={empl} />
                </li>
            )
          } else {
            return (
              <li key={empl.id}>
                <RmTeam rm={empl} data={data} isRmOnly={isRmOnly} />
              </li>
            )
          }
        })
      }
    </ul>
  )
}

export default RmTeam;