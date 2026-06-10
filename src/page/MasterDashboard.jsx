import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import InventoryManager from './InventoryManager'
const MasterDashboard = ({ onbacktoHomePage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [masterName, setMasterName] = useState('');
  const [activeView, setActiveView] = useState('overview')
  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setMasterName(storedName);
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="logo-area">
          <span className="logo-text"></span>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search here..." 
            className="search-input" 
          />
        </div>
        <div className="profile-area" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="avatar-btn">👤</div>

          {isDropdownOpen && (
            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-header">
                <h4 className="profile-name">{masterName || 'Master User'}</h4>
                <span className="status-badge">Onetime</span>
              </div>
              
              <hr className="dropdown-divider" />
              
              <button className="dropdown-item" onClick={() => alert('Shop Profile Clicked!')}>
                📁 Shop Profile
              </button>
              
              <button className="dropdown-item logout-btn" onClick={onbacktoHomePage}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="dashboard-main">
         {activeView ==='overview' && (
          <>
        <h2>Welcome back, {masterName || 'Master User'}!</h2>
        <p>Manage your products, stocks, and sales orders seamlessly from this panel.</p>
        <div className ="grid-container">
         <div className="inventory-card" onClick={() => setActiveView('inventory')}>
            <div className="icon-wrapper">📦</div>
            <h3 className="card-title">Inventory</h3>
          </div>
        </div>
        </>
        )}
        {activeView === 'inventory' && (
          <div>
            <button
            onClick={() => setActiveView('overview')}> 
            ⬅️  Back to Dashboard Overview
            </button>
          <InventoryManager/>
          </div>
        )}
      </main>
    </div>

  );
};

export default MasterDashboard;