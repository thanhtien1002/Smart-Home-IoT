import './CategoryFilters.css';

function CategoryFilters({ activeTab, onTabChange }) {
    return (
      <div className="device-filters">
        <button 
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => onTabChange('home')}
        >
          All
        </button>
        <button 
          className={activeTab === 'light' ? 'active' : ''}
          onClick={() => onTabChange('light')}
        >
          Lights
        </button>
        <button 
          className={activeTab === 'climate' ? 'active' : ''}
          onClick={() => onTabChange('climate')}
        >
          Climate
        </button>
        <button 
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => onTabChange('security')}
        >
          Security
        </button>
      </div>
    );
}
  
export default CategoryFilters;