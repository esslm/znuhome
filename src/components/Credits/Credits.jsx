import { useState } from 'react';
import './Credits.css';

const Credits = () => {
  const [showCredits, setShowCredits] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      username: 'ia1q_',
      url: 'https://instagram.com/ia1q_',
      icon: '📸'
    },
    {
      name: 'TikTok',
      username: 'ia1q_',
      url: 'https://tiktok.com/@ia1q_',
      icon: '🎵'
    },
    {
      name: 'Twitter',
      username: 'ia1q_',
      url: 'https://twitter.com/ia1q_',
      icon: '🐦'
    },
    {
      name: 'Discord',
      username: '61z.',
      url: 'discord://61z.',
      icon: '💬'
    },
    {
      name: 'Behance',
      username: 'znu',
      url: 'https://be.net/znu',
      icon: '🎨'
    }
  ];

  return (
    <>
      <div className="credits-button" onClick={() => setShowCredits(true)}>
        <span>C</span>
      </div>

      {showCredits && (
        <div className="modal">
          <div className="modal-content credits-modal">
            <h3>Connect with Me</h3>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-icon">{link.icon}</span>
                  <span className="social-name">{link.name}</span>
                  <span className="social-username">@{link.username}</span>
                </a>
              ))}
            </div>
            <div className="copyright">
              <span> {new Date().getFullYear()} Esslam</span>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowCredits(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Credits;
