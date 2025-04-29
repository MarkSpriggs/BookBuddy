import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function SingleBook() {
  const { id } = useParams();
  const [singleBook, setSingleBook] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    async function fetchBookByID() {
      try {
        const res = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        const data = await res.json();
        if (data && data.title) {
          setSingleBook(data);
        } else {
          setErrorMessage("Book not found.");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setErrorMessage("Error fetching book details.");
      }
    }
    fetchBookByID();
  }, [id]);

  const handleReserve = async () => {
    if (!token) {
      alert("Log in to reserve a book");
      navigate("/");
      return;
    }

    if (!singleBook.available) {
      alert("This book is already reserved or unavailable.");
      return;
    }

    try {
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: id }),
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Reservation successful:", data);

      setSingleBook((prevState) => ({
        ...prevState,
        available: false,
      }));

      alert("Book reserved successfully!");
    } catch (error) {
      console.error("Reservation error:", error);
      alert(error.message || "Error reserving this book");
    }
  };

  return (
    <div className="bookByID">
      <h1>{singleBook.title}</h1>
      <h2>By: {singleBook.author}</h2>
      <img
        src={singleBook.coverimage}
        className="singleBookImage"
        alt="Book Cover"
      />
      <h2>
        {singleBook.available
          ? "This book is available, Check it out now!"
          : "This book is currently unavailable"}
      </h2>

      <button className="reserveButton" onClick={() => navigate("/")}>
        Go Back
      </button>

      {token && singleBook.available && (
        <button  onClick={handleReserve} className="reserveButton">
          Reserve Book
        </button>
      )}

      {!singleBook.available && <p></p>}
    

      <p>Summary: {singleBook.description}</p>

      </div>


      
  );
}
