import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, EditPage } from '../pages';
import Logo from '../logo';

function App() {
  return (
    <React.Fragment>
      <header>
        <Logo/>
      </header>
      <main role="main" className="container">
        <Switch>
          <Route
            path="/"
            component={HomePage}
            exact />

          <Route
            path="/new-course"
            component={EditPage} 
            exact />

          <Route path="/courses/:id"
            render={({ match }) => {
              const { id } = match.params;
              return <EditPage itemId={id} />;
            }}/>

          <Redirect to="/" />
        </Switch>
      </main>
      <footer>
        <div className='footer-wraper'>
          <p>© Videocourses. All Rights Reserved.</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
