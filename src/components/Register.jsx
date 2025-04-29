import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setFirstName }) {
  const [localFirstName, setLocalFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: localFirstName,
            lastname: lastName,
            email,
            password,
          }),
        }
      );

      const result = await res.json();

      if (result.token) {
        setFirstName(localFirstName);
        alert("You're all signed up! Please log in.");
        navigate("/login");
      } else {
        setError(
          result.error || "Registration failed. This email is already in use!"
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="registerPage">
      <h1>BookBuddy Sign Up</h1>
      <h2>
        Not signed up yet?
        <br />
        Please fill out the form below!
      </h2>

      {error && <p>{error}</p>}
      <form className="registerForm" onSubmit={handleSubmit}>
        <label className="formInput">
          First Name:
          <input
            name="firstname"
            onChange={(e) => setLocalFirstName(e.target.value)}
            value={localFirstName}
          />
        </label>
        <label className="formInput">
          Last Name:
          <input
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
        <label className="formInput">
          Email:
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="formInput">
          Password:
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>
        Signing up for BookBuddy will allow you to check out books from the
        library and track any that you have checked out!
      </h2>
    </div>
  );
}
