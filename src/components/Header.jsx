function Header() {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1 className="page-title">My Tasks</h1>
            </div>

            <div className="header-center">
                <div className="filter-group">
                    <select className="filter-select">
                        <option>Time</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                    <select className="filter-select">
                        <option>Level</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <select className="filter-select">
                        <option>Language</option>
                        <option>English</option>
                        <option>Portuguese</option>
                        <option>Spanish</option>
                    </select>
                    <select className="filter-select">
                        <option>Type</option>
                        <option>Personal</option>
                        <option>Work</option>
                        <option>Study</option>
                    </select>
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn" title="Search">
                    <span>⌕</span>
                </button>
                <button className="icon-btn" title="Refresh">
                    <span>↻</span>
                </button>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Christine Eve</span>
                        <span className="user-role">OWNER/ADMIN</span>
                    </div>
                    <div className="user-avatar">
                        <span className="avatar-text">CE</span>
                        <span className="status-dot"></span>
                    </div>
                </div>
            </div>
        </header>
    );
}
