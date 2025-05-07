import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import CheckPage from './CheckPage';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PlansPage from './PlansPage';
import Explorer from './Explorer';
import Dashboard from './dashboard/Dashboard';
import Documents from './dashboard/Documents';
import Settings from './dashboard/Settings';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="documents" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;