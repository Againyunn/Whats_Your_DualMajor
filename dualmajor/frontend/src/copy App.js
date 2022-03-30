import React, { useState, useEffect } from 'react';
import { Link, Route, Routes , BrowserRouter as Router } from 'react-router-dom';

import { signIn } from './auth';
import AuthRoute from './AuthRoute';

import Home from './Home';
import About from './About';
import Profile from './Profile';
import NotFound from './NotFound';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        {authenticated ? (
          <LogoutButton logout={logout} />
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </header>
      <hr />
      <main>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/login"
            render={props => (
              <LoginForm authenticated={authenticated} login={login} {...props} />
            )}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={props => <Profile user={user} {...props} />}
          />
          <Route component={NotFound} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
