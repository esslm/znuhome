import "./App.css";
import { DateAndTime, Search, Favorites, Wallpaper, Credits } from "./components";

function App() {
  return (
    <div className="app-container">
      <DateAndTime />
      <Search />
      <Favorites />
      <Wallpaper />
      <Credits />
    </div>
  );
}

export default App;
