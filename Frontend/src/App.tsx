// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import ForgetPassword from './pages/forgetpassword.tsx';
import SignupPage from './pages/signup.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div> {/* Added a wrapping div for styling if needed */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/forget-password">Forget Password</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;