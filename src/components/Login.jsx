/* TODO - add your code to create a functional React component that renders a login form */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, token, setFirstname }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const result = await res.json();
      console.log("Login result:", result);

      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("firstName", result.firstname);
        setToken(result.token);
        setFirstName(result.firstname);
      } else {
        setError(result.error);
        setTimeout(() => {
          navigate("/register");
        }, 100);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="loginContainer">
      <h1>LOGIN</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <label className="formInput">
          Email:
          <input
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </label>
        <label className="formInput">
          Password:
          <input
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button type="submit">SUBMIT</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
