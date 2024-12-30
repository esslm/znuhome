import { useState, useEffect } from 'react';
import './Wallpaper.css';

const Wallpaper = () => {
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);

  useEffect(() => {
    const storedWallpaper = localStorage.getItem("wallpaper");
    if (storedWallpaper) {
      document.body.style.backgroundImage = `url(${storedWallpaper})`;
    }
  }, []);

  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        document.body.style.backgroundImage = `url(${reader.result})`;
        localStorage.setItem("wallpaper", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWallpaperUrl = (url) => {
    document.body.style.backgroundImage = `url(${url})`;
    localStorage.setItem("wallpaper", url);
    setShowWallpaperModal(false);
  };

  return (
    <>
      <div className="wallpaper-button" onClick={() => setShowWallpaperModal(true)}>
        <span className="wallpaper-icon">🖼️</span>
      </div>

      {showWallpaperModal && (
        <div className="modal">
          <div className="modal-content wallpaper-modal">
            <h3>Change Wallpaper</h3>
            <div className="wallpaper-options">
              <div className="upload-section">
                <h4>Upload Image</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleWallpaperChange}
                  className="file-input"
                />
              </div>
              <div className="url-section">
                <h4>Or use URL</h4>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  onChange={(e) => handleWallpaperUrl(e.target.value)}
                />
              </div>
              <div className="preset-section">
                <h4>Preset Wallpapers</h4>
                <div className="preset-grid">
                  {[
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                    'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a',
                    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
                  ].map((url, index) => (
                    <div
                      key={index}
                      className="preset-wallpaper"
                      onClick={() => handleWallpaperUrl(url)}
                      style={{ backgroundImage: `url(${url})` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowWallpaperModal(false)}>Cancel</button>
              <button onClick={() => setShowWallpaperModal(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallpaper;
