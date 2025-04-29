/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";
import bookLogo from "../assets/books.png";
import { useNavigate } from "react-router-dom";

export default function Navigation({
  token,
  firstName,
  setToken,
  setFirstName,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    setToken(null);
    setFirstName("");
    navigate("/");
  };

  return (
    <nav id="navBar">
      <Link to="/" className="logoLink">
        <img id="logo-image" src={bookLogo} alt="Library Logo" />
        <h1>BookBuddy</h1>
      </Link>
      <div className="rightNav">
        {token ? (
          <>
            <p id="helloMessage">{firstName}</p>
            <Link to="/account" className="linkNav">
              Account
            </Link>
            <button onClick={handleLogout} className="linkButton">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="linkButton">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
