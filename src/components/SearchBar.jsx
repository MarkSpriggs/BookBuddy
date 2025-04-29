export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchBarContainer">
      <input
        type="text"
        className="searchInput"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
