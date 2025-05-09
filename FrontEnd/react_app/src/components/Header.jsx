import { useState } from 'react';
import './Header.css';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    return (
      <header className="header">
        <h1>Smart Home</h1>
        <div className="user-profile">
          <span className="user-avatar" onClick={toggleMenu}>👤</span>
          {showMenu && (
            <div className="user-menu">
              <ul>
                <li className='first_item'>Profile</li>
                <li>Statistical</li>
                <li>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </header>
    );
}
  
export default Header;
