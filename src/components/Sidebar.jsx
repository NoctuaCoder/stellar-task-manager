const { useState } = React;

function Sidebar({ currentView, onViewChange }) {
    const menuItems = [
        { icon: '▦', label: 'Dashboard', view: 'dashboard', badge: null },
        { icon: '☰', label: 'All Tasks', view: 'all', badge: null },
        { icon: '✉', label: 'Messages', view: 'messages', badge: 3 },
        { icon: '◉', label: 'Friends', view: 'friends', badge: 5 },
        { icon: '◫', label: 'Schedule', view: 'schedule', badge: null }
    ];

    const bottomItems = [
        { icon: '⚙', label: 'Settings', view: 'settings' },
        { icon: '◈', label: 'Directory', view: 'directory' }
    ];

    const handleItemClick = (view) => {
        if (view === 'settings') {
            alert('⚙️ Settings\n\nComing soon:\n• Theme customization\n• Notification preferences\n• Data export/import\n• Keyboard shortcuts');
        } else if (view === 'messages') {
            alert('✉️ Messages\n\n3 new messages:\n• Team meeting at 3pm\n• Project update required\n• New task assigned');
        } else if (view === 'friends') {
            alert('◉ Friends\n\n5 friends online:\n• Working on similar tasks\n• Available for collaboration');
        } else if (view === 'schedule') {
            alert('◫ Schedule\n\nUpcoming:\n• Review tasks - Today 2pm\n• Team sync - Tomorrow 10am\n• Project deadline - Friday');
        } else if (view === 'directory') {
            alert('◈ Directory\n\nQuick access to:\n• Recent projects\n• Shared workspaces\n• Archived tasks');
        } else {
            onViewChange(view);
        }
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">★</span>
                    <span className="logo-text">Stellar</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`nav-item ${currentView === item.view ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleItemClick(item.view);
                        }}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && (
                            <span className="nav-badge">{item.badge}</span>
                        )}
                    </a>
                ))}
            </nav>

            <div className="sidebar-bottom">
                {bottomItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className="nav-item"
                        onClick={(e) => {
                            e.preventDefault();
                            handleItemClick(item.view);
                        }}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </a>
                ))}
            </div>
        </aside>
    );
}
