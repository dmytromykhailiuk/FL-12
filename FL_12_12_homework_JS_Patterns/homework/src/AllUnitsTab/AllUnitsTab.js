import React from 'react';
import RmTeam from '../Components/RmTeam';

class AllUnitsTab extends React.Component {
  render() {

    const headRm = this.props.users.find(el => el.rm_id === null)
    
    return (
      <React.Fragment>
        <main className="main" >
          <RmTeam rm={headRm} data={this.props.users} isRmOnly={true} />
        </main>
      </React.Fragment>
    );
  }
}

export default AllUnitsTab;