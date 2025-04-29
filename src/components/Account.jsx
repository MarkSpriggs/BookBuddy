import { useEffect, useState } from "react";
import MyBooksCard from "./MyBooksCard";

export default function Account({ firstName, token, email }) {
  const [reservations, setReservations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setReservations(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message || "Failed to fetch reservations");
      }
    }

    if (token) {
      fetchReservations();
    }
  }, [token]);

  const handleReturnBook = async (reservationID) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservations((prevReservations) =>
        prevReservations.filter((book) => book.id !== reservationID)
      );

      alert("Book returned successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to return the book");
    }
  };

  return (
    <div className="accountPage">
      <h1>Welcome back, {firstName}!</h1>

      <h2>Account email: {email || "not available"} </h2>

      <h1>Your Checked Out Books:</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {reservations.length > 0 ? (
        <div className="bookCardContainer">
          {reservations.map((book) => (
            <MyBooksCard
              key={book.id}
              book={book}
              handleReturnBook={() => handleReturnBook(book.id)}
            />
          ))}
        </div>
      ) : (
        <p>
          You have no books checked out <br></br> :(
        </p>
      )}
    </div>
  );
}
