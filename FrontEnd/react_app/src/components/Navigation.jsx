import './Navigation.css';

function Navigation() {
    return (
      <nav className="nav-bar">
        <button className="nav-button active">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </button>
        <button className="nav-button">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Stats</span>
        </button>
        {/* <button className="nav-button">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </button> */}
        <button className="nav-button">
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </button>
      </nav>
    );
}
  
export default Navigation;