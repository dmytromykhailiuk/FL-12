import React from 'react';
import RmTeam from '../Components/RmTeam';

class AllEmployeesTab extends React.Component {
  render() {

    const headRm = this.props.users.find(el => el.rm_id === null)
    
    return (
      <React.Fragment>
        <main className="main" >
          <RmTeam rm={headRm} data={this.props.users} isRmOnly={false} />
        </main>
      </React.Fragment>
    );
  }
}

export default AllEmployeesTab;