import './App.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './components/Login'
import Upload from './components/Upload'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return authenticated ? children : null;
};

function App() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 style={{color:"black"}}>Welcome to PDF to Excel Converter</h1>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/upload" element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
