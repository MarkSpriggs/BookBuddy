import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navigation from './components/Navigation';
import Account from './components/Account';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      async function fetchUser() {
        try {
          const res = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userInfo = await res.json();
          setFirstName(userInfo.firstname);
          console.log(userInfo);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    setToken(null);
    setFirstName("");
    navigate("/");
  };

  return (
    <>
      <Navigation 
        bookLogo={bookLogo} 
        firstName={firstName} 
        setFirstName={setFirstName} 
        token={token} 
        setToken={setToken} 
        handleLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlebook/:id" element={<SingleBook />} />
        <Route 
          path="/login" 
          element={<Login setToken={setToken} token={token} setFirstName={setFirstName} />} 
        />
        <Route path="/register" element={<Register setFirstName={setFirstName} />} />
        <Route path="/account" element={<Account token={token} firstName={firstName}/>} />
      </Routes>
    </>
  );
}

export default App;