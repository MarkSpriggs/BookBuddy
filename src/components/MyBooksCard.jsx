export default function MyBooksCard({ book, handleReturnBook }) {
  return (
    <div className="bookCard">
      <h2 className="bookTitle">{book.title}</h2>
      <img className="cardImage" src={book.coverimage}></img>
      <h2 className="bookAuthor">{book.author}</h2>
      <button className="actionButton"onClick={handleReturnBook}>Return Book</button>
    </div>
  );
}
