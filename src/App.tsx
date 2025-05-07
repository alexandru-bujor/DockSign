import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CheckPage from './CheckPage';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PlansPage from './PlansPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/plans" element={<PlansPage />} />
      </Routes>
    </>
  );
}

export default App;