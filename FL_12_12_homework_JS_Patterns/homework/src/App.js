import React from 'react';
import './App.css';
import Client from './Client';

class App extends React.Component {
  componentDidMount() {
    if (!this.state.users.length) {
      this.loadUsers()
        .then((body) => {        
          this.setState({
            users: [...body]
          });
        })
    }
  }

  state = {
    users: [],
    selectedTab: ''
  }

  loadUsers = async () => {
    const res = await fetch(`https://roman4ak.github.io/fe-oop-lab/mocks/epms.json`);
    const body = await res.json();
    return body;
  }

  onTab = (e, tab) => {
    if (this.state.selectedTab !== '') {
      document
        .getElementById(`${this.state.selectedTab}Tab`)
        .classList.remove('active');
    }
    
    e.target.classList.add('active');
    
    this.setState({
      selectedTab: tab
    });
  }

  render() {
    let mainContent;

    switch(this.state.selectedTab){
      case 'Employees':
        mainContent = <Client data={this.state.users} tab='all' />
        break;
      case 'Units':
        mainContent = <Client data={this.state.users} tab='units' />
        break;
      case 'Warning':
        mainContent = <Client data={this.state.users}  tab='warnings'/>
        break;
      default:
        mainContent = '';
    }

    return (
      <React.Fragment>

        <header className="header">
          <button 
            id="EmployeesTab"
            onClick={(e) => this.onTab(e, 'Employees')}
          >All Employees</button>
          <button 
            id="UnitsTab"
            onClick={(e) => this.onTab(e, 'Units')}
          >All Units</button>
          <button 
            id="WarningTab"
            onClick={(e) => this.onTab(e, 'Warning')}
          >Warning Employees</button>
        </header>

        { mainContent }

      </React.Fragment>
    );
  }
}

export default App;
