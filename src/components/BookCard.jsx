import { useNavigate } from "react-router-dom";

export default function BookCard({ book, selectedBook, setSelectedBook }) {
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedBook(book);
    navigate(`/singlebook/${book.id}`);
  };

  return (
    <div className="bookCard">
      <h2 className="bookTitle">{book.title}</h2>
      <img className="cardImage" src={book.coverimage}></img>
      <h2>{book.author}</h2>
      <h2>
        {book.available
          ? "This book is Available!"
          : "this book is currenly unavailable"}
      </h2>
      <button onClick={handleClick}>More Info</button>
    </div>
  );
}
