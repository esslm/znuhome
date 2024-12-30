import { useState, useRef, useEffect } from 'react';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [showAddFavorite, setShowAddFavorite] = useState(false);
  const [showEditFavorite, setShowEditFavorite] = useState(false);
  const [newFavoriteUrl, setNewFavoriteUrl] = useState("");
  const [newFavoriteTitle, setNewFavoriteTitle] = useState("");
  const [editingFavorite, setEditingFavorite] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addFavorite = async () => {
    if (!newFavoriteUrl || !newFavoriteTitle) return;

    try {
      const favicon = `https://www.google.com/s2/favicons?domain=${newFavoriteUrl}&sz=64`;
      const newFavorite = {
        id: Date.now(),
        url: newFavoriteUrl.startsWith('http') ? newFavoriteUrl : `https://${newFavoriteUrl}`,
        title: newFavoriteTitle,
        favicon,
        letter: newFavoriteTitle.charAt(0).toUpperCase()
      };

      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      
      setNewFavoriteUrl("");
      setNewFavoriteTitle("");
      setShowAddFavorite(false);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const startEdit = (favorite) => {
    setEditingFavorite(favorite);
    setNewFavoriteUrl(favorite.url);
    setNewFavoriteTitle(favorite.title);
    setShowEditFavorite(true);
    setActiveMenu(null);
  };

  const saveEdit = () => {
    if (!newFavoriteUrl || !newFavoriteTitle) return;

    const updatedFavorites = favorites.map(fav => {
      if (fav.id === editingFavorite.id) {
        return {
          ...fav,
          url: newFavoriteUrl.startsWith('http') ? newFavoriteUrl : `https://${newFavoriteUrl}`,
          title: newFavoriteTitle,
          letter: newFavoriteTitle.charAt(0).toUpperCase()
        };
      }
      return fav;
    });

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setShowEditFavorite(false);
    setEditingFavorite(null);
    setNewFavoriteUrl("");
    setNewFavoriteTitle("");
  };

  const removeFavorite = (id) => {
    setDeletingId(id);
    setActiveMenu(null);
    
    setTimeout(() => {
      const updatedFavorites = favorites.filter(fav => fav.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setDeletingId(null);
    }, 300); 
  };

  const toggleMenu = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <>
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <div 
            key={favorite.id} 
            className={`favorite-wrapper ${deletingId === favorite.id ? 'deleting' : ''}`}
          >
            <a
              href={favorite.url}
              className="favorite-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="favorite-icon">
                {favorite.favicon ? (
                  <img src={favorite.favicon} alt="" onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }} />
                ) : (
                  <span>{favorite.letter}</span>
                )}
              </div>
              <span className="favorite-title">{favorite.title}</span>
            </a>
            <button 
              className="menu-dots" 
              onClick={(e) => toggleMenu(favorite.id, e)}
            >
              ⋮
            </button>
            {activeMenu === favorite.id && (
              <div className="menu-dropdown" ref={menuRef}>
                <button onClick={() => startEdit(favorite)}>
                  <span>✏️</span> Edit
                </button>
                <button onClick={() => removeFavorite(favorite.id)}>
                  <span>🗑️</span> Delete
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div className="favorite-item add-favorite" onClick={() => setShowAddFavorite(true)}>
          <div className="favorite-icon">
            <span>+</span>
          </div>
          <span className="favorite-title">Add New</span>
        </div>
      </div>

      {showAddFavorite && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Favorite</h3>
            <input
              type="text"
              placeholder="Website URL"
              value={newFavoriteUrl}
              onChange={(e) => setNewFavoriteUrl(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Title"
              value={newFavoriteTitle}
              onChange={(e) => setNewFavoriteTitle(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddFavorite(false)}>Cancel</button>
              <button onClick={addFavorite}>Add</button>
            </div>
          </div>
        </div>
      )}

      {showEditFavorite && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Favorite</h3>
            <input
              type="text"
              placeholder="Website URL"
              value={newFavoriteUrl}
              onChange={(e) => setNewFavoriteUrl(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Title"
              value={newFavoriteTitle}
              onChange={(e) => setNewFavoriteTitle(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button onClick={() => {
                setShowEditFavorite(false);
                setEditingFavorite(null);
              }}>Cancel</button>
              <button onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
