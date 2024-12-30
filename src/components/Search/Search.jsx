import { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const randomPlaceholder = (() => {
    const array = [
      "Let's find what you need",
      "What are you curious about?",
      "Discover something new today",
      "How can I help you search?",
      "Start your journey here",
      "Explore the answers you seek",
      "Looking for something special?",
      "Search and discover amazing things",
      "Find what inspires you",
      "What do you want to learn today?",
      "You are beautiful today; let's watch YouTube!",
      "How are you? Let's listen to Spotify together!",
      "I am with you everywhere...",
    ];
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  })();

  const handleSearch = (event) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery);
    const searchURL = `https://www.google.com/search?q=${encodedQuery}`;
    window.location.href = searchURL;
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="searchBar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={randomPlaceholder} 
        className="search-input"
      />
    </form>
  );
};

export default Search;
