function Sidebar() {
    const menuItems = [
        { icon: '📊', label: 'Dashboard', active: true },
        { icon: '📝', label: 'All Tasks', active: false },
        { icon: '💬', label: 'Messages', active: false },
        { icon: '👥', label: 'Friends', active: false },
        { icon: '📅', label: 'Schedule', active: false }
    ];

    const bottomItems = [
        { icon: '⚙️', label: 'Settings', active: false },
        { icon: '📖', label: 'Directory', active: false }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">ēCoursie</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <a 
                        key={index}
                        href="#" 
                        className={`nav-item ${item.active ? 'active' : ''}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </a>
                ))}
            </nav>

            <div className="sidebar-bottom">
                {bottomItems.map((item, index) => (
                    <a 
                        key={index}
                        href="#" 
                        className="nav-item"
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </a>
                ))}
            </div>
        </aside>
    );
}
