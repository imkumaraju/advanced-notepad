import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="logo-section">
                <img src="/icons/icon48.png" alt="Logo" className="header-logo" />
                <h1 className="header-title">Advanced Notepad</h1>
            </div>
        </header>
    );
};

export default Header;
